import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Artifact, Person} from "../../shared/generated/domain";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ScaleLogarithmic, ScaleOrdinal} from "d3-scale";


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


  private filterId: string = "AUTHOR_BUBBLES_FILTER";
  private selectedAuthorId: number;
  private t = d3.transition().duration(750);
  private data: Artifact[];
  myControl = new FormControl();
  private fontScale: ScaleLogarithmic<number, number>;
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  filteredOptions: Observable<Bubble[]>;
  private currentData: Bubble[] = [];

  constructor(private artifactImagesService: ArtifactImageService) {
  }


  ngOnInit(): void {

    // d3.csv("assets/flare.csv").then(root => {
    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      this.initChart(this.data);
      subscription.unsubscribe();
    });

    this.artifactImagesService.filters$.subscribe(filterChangeEvent => {
      if (filterChangeEvent.triggerFilterId == this.filterId) return;
      let filteredData: Artifact[] = [];
      this.data.forEach(artifact => {
        filteredData.push(artifact);
      })
      for(var filter of filterChangeEvent.filters) {
        if (filter.id == this.filterId) continue;
        filteredData = filteredData.filter(filter.filterFunction);
      }
      d3.select(".bubbles").selectAll("*").remove();
      this.initChart(filteredData);
    })
  }



  private initChart(artifactData: Artifact[]) {


    let authorMap: Map<string, number> = new Map<string, number>();

    for (var artifact of artifactData) {
      for (var author of artifact.authors) {
        let authorAsString = JSON.stringify(author);
        if (authorMap.has(authorAsString)) {
          authorMap.set(authorAsString, authorMap.get(authorAsString) + 1);
        } else {
          authorMap.set(authorAsString, 1);
        }
      }
    }

    this.currentData = []

    let totalUndfArts: number = 0;
    let otherAuthorIds: number[] = [];

    if (authorMap.size <= 40) {
      authorMap.forEach((value: number, key: string) => {
        let author: Person = JSON.parse(key);
        this.currentData.push({name: author.name, id: author.id, value: value});
      });
    }  else {
      authorMap.forEach((value: number, key: string) => {
        let author: Person = JSON.parse(key);
        if (value >= 5) {
          this.currentData.push({name: author.name, id: author.id, value: value});
        } else {
          otherAuthorIds.push(author.id);
          totalUndfArts = totalUndfArts + value;
        }
      });
      this.currentData.push({name: "Others", id: -1, value: totalUndfArts});
    }
    this.currentData = this.currentData.sort((n1,n2) => {
      if (n1.value < n2.value) {
        return 1;
      }

      if (n1.value > n2.value) {
        return -1;
      }

      return 0;
    });


    let maxVal: number = -1;
    this.currentData.forEach(bubble => {
      maxVal = bubble.value > maxVal ? bubble.value : maxVal;
    })

    // let myScale = d3.scaleLog()
    //   .base(10)
    //   .domain([10, maxVal])
    //   .range([10, maxVal]);

    this.fontScale = d3.scaleLog()
      .base(2)
      .domain([1, maxVal])
      .range([8, 16]);

    // let fontScale = d3.scaleLinear()
    //   .domain([10, maxVal])
    //   .range([6, 25]);

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


    var rootLayout = d3.hierarchy({children: this.currentData});
    // @ts-ignore
    // rootLayout.sum(d => myScale(d.value));
    rootLayout.sum(d => d.value);


    var pack =
      d3.pack()
        .size([width - 2, height - 2])
        .padding(3)(rootLayout);

    var nodes = pack.leaves();

    const leaf = svg.selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", (d: any) => `translate(${d.x + 1},${d.y + 1})`)
      .attr("id", (d: any) => "bubbleHolder" + d.data.id)
      .on("mouseover", (d: any) => this.raiseBubble(d.data.id))
      .on("mouseout", (d: any) => this.unRaiseBubble(d.data.id));


    leaf.append("circle")
      // @ts-ignore
      .attr("id", (d: any) => "bubble" + d.data.id)
      .attr("r", 0)
      .attr("fill-opacity", 0.7)
      .attr("fill", (d: any) => this.color(d.data.id))
      .transition()
      .duration(1000)
      .attr("r", (d: any) => d.r)


    // leaf.append("clipPath")
    //   // @ts-ignore
    //   .attr("id", (d: any) => "clippath"+d.id)
    //   .append("circle")
    //   // @ts-ignore
    //   .attr("r", (d: any) => d.r);

    // @ts-ignore
    leaf.append("text")
      // .attr("clip-path", (d:any) =>`url(#clippath${d.id})`)
      .style("font-size", (d: any) => {
        return d.r > 20 ? this.fontScale(d.value) : 0;
      })
      .attr("id", (d: any) => "bubbletext" + d.data.id)
      .selectAll("tspan")
      .data((d: any) => (d.data.name+" ("+d.data.value+")").split(/(?=[A-Z][a-z])|\s+/g))
      .join("tspan")
      .style("fill", "rgba(0, 0, 0, 0.1)")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d)
      .transition()
      .duration(2000)
      .style("fill", "rgba(0, 0, 0, 1)");

    leaf.append("title")
      .text((d: any) => `${d.data.name}`);

    leaf
      .style("cursor", "pointer")
      .on("click", (d: any) => {
        d3.select("#bubble" + this.selectedAuthorId).classed("currentSelectedAuthor", false);
        if (this.selectedAuthorId == d.data.id) {
          this.artifactImagesService.removeFilterAndPublish(this.filterId);
          this.selectedAuthorId = null;
          return;
        }
        this.filterId = this.artifactImagesService.addFilterById(
          this.filterId,
            `Author: ${d.data.name}`,
            artifact => {
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
        },
          () => this.selectedAuthorId = null)

        d3.select("#bubble" + d.data.id).classed("currentSelectedAuthor", true);
        this.selectedAuthorId = d.data.id;
      })



    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
  }

  private raiseBubble(bubbleId: number) {
    d3.select("#bubbleHolder" + bubbleId).raise();
    d3.select("#bubbletext" + bubbleId).style("font-size", (d: any) => this.fontScale(d.value) + 6);
    d3.select("#bubble" + bubbleId).transition().duration(300)
      .attr("r", (d: any) => d.r + 30)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 2);
  }

  private unRaiseBubble(bubbleId: number) {
    d3.select("#bubbletext" + bubbleId)
      .style("font-size", (d: any) => {
        return d.r > 20 ? this.fontScale(d.value) : 0;
      });
    d3.select("#bubble" + bubbleId).transition().duration(300)
      .attr("r", (d: any) => d.r)
      .attr("fill", (d: any) => this.color(bubbleId.toString()))
      .attr("stroke-width", 0);
  }

  private _filter(value: string): Bubble[] {
    if (value == '' || isNaN(Number(value))) {
      const filterValue = value.toLowerCase();
      return this.currentData.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      let bubbleId = +value;
      this.raiseBubble(bubbleId);
      this.myControl.setValue("");
      return this.currentData;
    }
  }

  displayFn = value => {
    return value ? this.currentData.find(_ => _.id === value).name : undefined;
  }



}

