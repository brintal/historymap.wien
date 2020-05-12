import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Artifact, Person} from "../../shared/generated/domain";


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
  private selectedAuthorId1: number;
  private selectedAuthorId2: number;
  private data: Artifact[];
  private width = 500;
  private height = 400;
  private margin = {top: 30, right: 30, bottom: 30, left: 30};
  private simulation = this.initSim();

  constructor(private artifactImagesService: ArtifactImageService) {
  }


  ngOnInit() {


    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      this.initGraph(data);
      subscription.unsubscribe();
    });


    this.artifactImagesService.filters$.subscribe(filterChangeEvent => {
      let filteredData: Artifact[] = [];
      this.data.forEach(artifact => {
        filteredData.push(artifact);
      })
      for (var filter of filterChangeEvent.filters) {
        if (filter.id == this.filterId) continue;
        filteredData = filteredData.filter(filter.filterFunction);
      }
      d3.select(".network").selectAll("*").remove();
      console.log("received filters")
      this.simulation = this.initSim();
      this.initGraph(filteredData);
    });


  }

  private initSim() {
    return d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force("x", d3.forceX(this.width / 2))
      .force("y", d3.forceY(this.height / 2));
  }

  private initGraph(data: Artifact[]) {
    let svg = d3.select(".network");

    svg.attr("width", this.width)
      .attr("height", this.height);

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
      .attr('stroke-width', (d: any) => d.value * 1.5)
      .style("visibility", "hidden");

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr("id", value => 'author' + value.id)
      // @ts-ignore
      .attr('fill', "#F0F8FF")
      .style("visibility", "hidden")
      .on('click', author => this.addAuthorFilter(author.id));
    node.on("mouseover", author => {
      this.mouseovernode(links, author);
    });
    node.on("mouseout", function (d) {
      d3.select(".nodes")
        .selectAll("circle")
        .classed("mouseovernodegroup", false)
        .classed("mouseovernode", false);
    });

    ;


    svg.selectAll('circle').call(d3.drag()
      .on('start', (d: any) => {
        if (!d3.event.active) {
          this.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (d: any) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      })
      .on('end', (d: any) => {
        if (!d3.event.active) {
          this.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      })
    );

    node.append('title')
      .text((d) => d.name);

    this.simulation
      // @ts-ignore
      .nodes(graph.nodes)
      .on('tick', () => {
        console.log("ontick")
        link
          .style("visibility", "visible")
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
          })
        ;

        node
          .style("visibility", "visible")
          .attr('cx', function (d: any) {
            return d.x;
          })
          .attr('cy', function (d: any) {
            return d.y;
          })
        ;
      });

    // @ts-ignore
    this.simulation.force('link').links(graph.links);
  }

  private mouseovernode(links: AuthorLink[], author: AuthorNode) {
    let connectedNodeIds = links
      .filter((x: any) => x.source.id == author.id || x.target.id == author.id)
      .map((x: any) => x.source.id == author.id ? x.target.id : x.source.id);
    for (var y of connectedNodeIds) {
      d3.select("#author" + y)
        .classed("mouseovernodegroup", true);
    }
    d3.select("#author" + author.id).classed("mouseovernode", true);
  }

  private addAuthorFilter(authorId: number) {

    d3.select("#author" + this.selectedAuthorId1).classed("currentSelectedAuthor", false);
    if (authorId != this.selectedAuthorId1) {
      d3.select("#author" + authorId).classed("currentSelectedAuthor", true);
    }

    if (this.selectedAuthorId1 == authorId) {
      this.artifactImagesService.removeFilterAndPublish(this.filterId);
      this.selectedAuthorId1 = null;
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
    this.selectedAuthorId1 = authorId;
  }

}
