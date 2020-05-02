import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Person} from "../../shared/generated/domain";


interface Bubble {
  name: string;
  value: number;
  id: number;
}

@Component({
  selector: 'app-author-bubbles',
  templateUrl: './author-bubbles.component.html',
  styleUrls: ['./author-bubbles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorBubblesComponent implements OnInit {


  private filterId: number;
  private selectedAuthorId: number;

  constructor(private artifactImagesService: ArtifactImageService) {
  }


  ngOnInit(): void {

    // d3.csv("assets/flare.csv").then(root => {
    let subscription = this.artifactImagesService.artifactData$.subscribe(root => {


      let authorMap: Map<string, number> = new Map<string, number>();

      for (var artifact of root) {
        for (var author of artifact.authors) {
          let authorAsString = JSON.stringify(author);
          if (authorMap.has(authorAsString)) {
            authorMap.set(authorAsString, authorMap.get(authorAsString) + 1);
          } else {
            authorMap.set(authorAsString, 1);
          }
        }
      }

      console.log(authorMap.size);

      let data: Bubble[] = [];

      let totalUndfArts: number = 0;
      let otherAuthorIds: number[] = [];

      authorMap.forEach((value: number, key: string) => {
        let author: Person = JSON.parse(key);
        if (value >= 5) {
          data.push({name: author.name, id: author.id, value: value});
        } else {
          otherAuthorIds.push(author.id);
          totalUndfArts = totalUndfArts + value;
        }
      });
      data.push({name: "Others", id: -1, value: totalUndfArts});

      let maxVal: number = -1;
      data.forEach(bubble => {
        maxVal = bubble.value > maxVal ? bubble.value : maxVal;
      })

      // let myScale = d3.scaleLog()
      //   .base(10)
      //   .domain([10, maxVal])
      //   .range([10, maxVal]);

      let fontScale = d3.scaleLog()
        .base(2)
        .domain([10, maxVal])
        .range([6, 16]);

      // let fontScale = d3.scaleLinear()
      //   .domain([10, maxVal])
      //   .range([6, 25]);


      var color = d3.scaleOrdinal(d3.schemePaired);
      var format = d3.format(",d");

      const svg = d3.select(".bubbles");
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      // @ts-ignore
      svg
        // .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 8)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");


      var rootLayout = d3.hierarchy({children: data});
      // @ts-ignore
      // rootLayout.sum(d => myScale(d.value));
      rootLayout.sum(d => d.value);

      console.log(rootLayout);

      var pack =
        d3.pack()
          .size([width - 2, height - 2])
          .padding(3)(rootLayout);

      var nodes = pack.leaves();
      console.log(nodes);

      const leaf = svg.selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", (d: any) => `translate(${d.x + 1},${d.y + 1})`);


      leaf.append("circle")
        // @ts-ignore
        .attr("id", (d: any) => "bubble"+d.data.id)
        .attr("r", (d: any) => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", (d: any) => color(d.data.id));


      // leaf.append("clipPath")
      //   // @ts-ignore
      //   .attr("id", (d: any) => "clippath"+d.id)
      //   .append("circle")
      //   // @ts-ignore
      //   .attr("r", (d: any) => d.r);

      // @ts-ignore
      leaf.append("text")
        // .attr("clip-path", (d:any) =>`url(#clippath${d.id})`)
        .style("font-size", d => fontScale(d.value))
        .selectAll("tspan")
        .data((d: any) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d);

      leaf.append("title")
        .text((d: any) => `${d.data.name}`);

      leaf
        .style("cursor", "pointer")
        .on("click", (d: any) => {
          this.artifactImagesService.removeFilter(this.filterId);
          d3.select("#bubble" + this.selectedAuthorId).classed("currentSelectedAuthor", false);
          if (this.selectedAuthorId == d.data.id) {
            this.selectedAuthorId = null;
            return;
          }
          this.filterId = this.artifactImagesService.addFilter(artifact => {
            if (d.data.id == -1) { // "other" selected
              for (var author of artifact.authors) {
                for (var otherAuthorId of otherAuthorIds) {
                  if (author.id == otherAuthorId) {
                    return true;
                  }
                }
              }
            } else {
              for (var author of artifact.authors) {
                if (author.id == d.data.id) {
                  return true;
                }
              }
            }
            return false;
          })

          d3.select("#bubble" + d.data.id).classed("currentSelectedAuthor", true);
          this.selectedAuthorId = d.data.id;
        })

      subscription.unsubscribe();

    });

  }

}
