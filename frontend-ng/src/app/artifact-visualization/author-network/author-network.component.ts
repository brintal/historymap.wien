import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Person} from "../../shared/generated/domain";


interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

interface AuthorGraph {
  nodes: AuthorNode[];
  links: AuthorLink[];
}

interface AuthorNode {
  id: number;
  name: string;
  group: number;
}

interface AuthorLink {
  source: number;
  target: number;
  value: number;
}


@Component({
  selector: 'app-author-network',
  templateUrl: './author-network.component.html',
  styleUrls: ['./author-network.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorNetworkComponent implements OnInit {

  private filterId: string;
  private selectedAuthorId: number;

  constructor(private artifactImagesService: ArtifactImageService) {
  }


  ngOnInit() {

    const svg = d3.select(".network");
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Keep nodes centered on screen
    var centerXForce = d3.forceX(width / 2);
    var centerYForce = d3.forceY(height / 2);


    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force("x", centerXForce)
      .force("y", centerYForce);
    // .force('center', d3.forceCenter(width / 2, height / 2));

    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {


      let authorMap: Map<number, Person> = new Map<number, Person>();
      let linkMap: Map<string, AuthorLink> = new Map<string, AuthorLink>();

      for (var artifact of data) {

        if (artifact.authors.length > 1) {
          artifact.authors.forEach(person => {
            if (!authorMap.has(person.id)) {
              authorMap.set(person.id, person);
            }
          })

          for (let i = 0; i < artifact.authors.length - 1; i++) {
            for (let j = i + 1; j < artifact.authors.length; j++) {

              // console.log("i: "+i);
              // console.log("j: "+j);
              // console.log(artifact.authors[i]);
              // console.log(artifact.authors[j]);

              let node1: Person;
              let node2: Person;
              if (artifact.authors[i] < artifact.authors[j]) {
                node1 = artifact.authors[i];
                node2 = artifact.authors[j];
              } else {
                node1 = artifact.authors[j];
                node2 = artifact.authors[i];
              }
              let linkId: string = node1.id + "-" + node2.id;

              if (linkMap.has(linkId)) {
                linkMap.get(linkId).value++;
              } else {
                linkMap.set(linkId, {source: node1.id, target: node2.id, value: 1});
              }

            }
          }
        }
      }

      const nodes: AuthorNode[] = Array.from(authorMap.values()).map(author => {
        return {
          id: author.id,
          group: 1,
          name: author.name
        }
      });

      const links: AuthorLink[] = Array.from(linkMap.values());

      const graph: AuthorGraph = <AuthorGraph>{nodes, links};

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter()
        .append('line')
        .attr('stroke-width', (d: any) => d.value*1.5);

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter()
        .append('circle')
        .attr('r', 8)
        .attr("id", value => 'author' + value.id)
        // @ts-ignore
        .attr('fill', "#ff5722")
        .on('click', author => {
          d3.select("#author" + this.selectedAuthorId).classed("currentSelectedAuthor", false);
          if (author.id != this.selectedAuthorId) {
            d3.select("#author" + author.id).classed("currentSelectedAuthor", true);
          }
          this.addAuthorFilter(author.id);
        });
        node.on("mouseover", author => {
          let connectedNodeIds = links
            .filter((x:any) => x.source.id == author.id || x.target.id == author.id)
            .map((x:any) => x.source.id == author.id ? x.target.id : x.source.id);
          for(var y of connectedNodeIds) {
            d3.select("#author"+y)
              .classed("mouseovernodegroup", true);
          }
          d3.select("#author"+author.id).classed("mouseovernode", true);
        });
      node.on("mouseout", function(d) {
        d3.select(".nodes")
          .selectAll("circle")
          .classed("mouseovernodegroup", false)
          .classed("mouseovernode", false);
      });

      ;


      svg.selectAll('circle').call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

      node.append('title')
        .text((d) => d.name);

      simulation
        // @ts-ignore
        .nodes(graph.nodes)
        .on('tick', ticked);

      simulation.force<d3.ForceLink<any, any>>('link')
        .links(graph.links);

      function ticked() {
        link
          .attr('x1', function (d: any) {
            return d.source.x;
          })
          .attr('y1', function (d: any) {
            return d.source.y;
          })
          .attr('x2', function (d: any) {
            return d.target.x;
          })
          .attr('y2', function (d: any) {
            return d.target.y;
          });

        node
          .attr('cx', function (d: any) {
            return d.x;
          })
          .attr('cy', function (d: any) {
            return d.y;
          });
      }

      subscription.unsubscribe();
    });

    function dragstarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }

  private addAuthorFilter(authorId: number) {
    if (this.selectedAuthorId == authorId) {
      this.artifactImagesService.removeFilterAndPublish(this.filterId);
      this.selectedAuthorId = null;
      this.filterId = null;
      return;
    }

    this.artifactImagesService.removeFilter(this.filterId);
    this.filterId = this.artifactImagesService.addFilter(artifact => {
      for (var person of artifact.authors) {
        if (person.id == authorId) {
          return true;
        }
      }
      return false;
    })
    this.selectedAuthorId = authorId;
  }

}
