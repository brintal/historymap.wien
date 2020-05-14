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

  private filterId: string = "AUTHOR_NETWORK_FILTER";
  private selectedAuthorIds: number[] = [];
  private selectedAuthorId1: number;
  private selectedAuthorId2: number;
  private data: Artifact[];
  private width = 500;
  private height = 400;
  private margin = {top: 30, right: 30, bottom: 30, left: 30};
  private simulation = this.initSim();
  private nodes: AuthorNode[];
  private links: AuthorLink[];
  private authorMap: Map<number, Person> = new Map<number, Person>();

  constructor(private artifactImagesService: ArtifactImageService) {
  }


  ngOnInit() {


    this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      this.initGraph(data);
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
      if (filterChangeEvent.triggerFilterId != this.filterId) {
        d3.select(".network").selectAll("*").remove();
        this.simulation = this.initSim();
        this.initGraph(filteredData);
        this.selectedAuthorIds.forEach(selectedAuthorId => {
          this.disableAllUnconnectedNodes(selectedAuthorId);
          d3.select("#author" + selectedAuthorId).classed("currentSelectedAuthor", true);
        })
      }
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

    this.authorMap = new Map<number, Person>();
    let linkMap: Map<string, AuthorLink> = new Map<string, AuthorLink>();

    for (var artifact of data) {

      if (artifact.authors.length > 1) {
        artifact.authors.forEach(person => {
          if (!this.authorMap.has(person.id)) {
            this.authorMap.set(person.id, person);
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

    this.nodes = Array.from(this.authorMap.values()).map(author => {
      return {
        id: author.id,
        group: 1,
        name: author.name
      }
    });

    this.links = Array.from(linkMap.values());

    const graph: AuthorGraph = {
      links: this.links,
      nodes: this.nodes
    }

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr("class", value => 'link' + value.source + '-' + value.target)
      .attr('stroke-width', (d: any) => d.value * 1.5)
      .style("visibility", "hidden");

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll("g")
      .data(graph.nodes)
      .enter()
      .append("g")
      .attr('id', value => 'node'+value.id)
      .attr('class', 'authornode');

    const circle = node
      .append('circle')
      .attr('r', 8)
      .attr("id", value => 'author' + value.id)
      // @ts-ignore
      .attr('fill', "#fff59d")
      .style("visibility", "hidden")
      .on('click', author => this.addAuthorFilter(author.id));

    node.append("text")
      .attr("id", value => 'authortext'+value.id)
      .style("font-size", graph.nodes.length > 20 ? 0 : 10)
      .style("fill", (d, i) => '#c0c0c0')
      .text(value => value.name)
      .attr('x', 6)
      .attr('y', 3);



    circle.on("mouseover", author => {
      this.mouseovernode(this.links, author);
    });
    circle.on("mouseout", function (d) {
      d3.select(".nodes").selectAll('text')
        .classed("mouseovertext", false);
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
        d3.select(".nodes").selectAll('text')
          .classed("mouseovertext", false);
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

    circle.append('title')
      .text((d) => d.name);

    this.simulation
      // @ts-ignore
      .nodes(graph.nodes)
      .on('tick', () => {
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

        circle
          .style("visibility", "visible")

        ;
        node
          .attr("transform", function(d:any) {
            return "translate(" + d.x + "," + d.y + ")";
          })
      });

    // @ts-ignore
    this.simulation.force('link').links(graph.links);
  }

  private mouseovernode(links: AuthorLink[], author: AuthorNode) {
    d3.select('#node'+author.id).raise();
    d3.select('#authortext'+author.id)
      .classed("mouseovertext", true);
    let connectedNodeIds = this.findConnectedNodeIds(author.id);
    for (var y of connectedNodeIds) {
      d3.select("#author" + y)
        .classed("mouseovernodegroup", true);
    }
    d3.select("#author" + author.id).classed("mouseovernode", true);
  }

  private addAuthorFilter(authorId: number) {

    // if (this.selectedAuthorIds.length < 2) {
    //   d3.select("#author" + authorId).classed("currentSelectedAuthor", true);
    //   this.disableAllUnconnectedNodes(authorId);
    // }

    if (this.selectedAuthorIds.includes(authorId)) {
      this.selectedAuthorIds = this.selectedAuthorIds.filter(selectedAuthorId => selectedAuthorId != authorId)
      d3.select("#author" + authorId).classed("currentSelectedAuthor", false);
    } else {
      this.selectedAuthorIds.push(authorId);
      d3.select("#author" + authorId).classed("currentSelectedAuthor", true);
      d3.select("#author" + authorId).raise();
    }
    this.clearUnavailableElements();

    this.selectedAuthorIds.forEach(selectedAuthorId => {
      this.disableAllUnconnectedNodes(selectedAuthorId)
    })
    if (this.selectedAuthorIds.length > 0) {
      console.log(this.authorMap);
      let description = this.selectedAuthorIds.map(selectedAuthorId => {
        return this.authorMap.get(selectedAuthorId).name
      }).join(" - ")
      this.artifactImagesService.addFilterById(
        this.filterId,
        `Related Authors: ${description}`
        , artifact => {
          if (artifact.authors == null || artifact.authors.length == 0) {
            return false;
          }
          for (var selectedAuthorId of this.selectedAuthorIds) {
            if (!artifact.authors.map(author => author.id).includes(selectedAuthorId)) {
              return false;
            }
          }
          return true;
        },
        () => {
          console.log("clear filter called");
          this.selectedAuthorIds = [];
          this.clearUnavailableElements();
        }
      )
    } else {
      this.artifactImagesService.removeFilterAndPublish(this.filterId);
    }

    //
    // if (this.selectedAuthorId1 == authorId) {
    //   this.artifactImagesService.removeFilterAndPublish(this.filterId);
    //   this.selectedAuthorId1 = null;
    //   this.filterId = null;
    //   return;
    // }
    //
    // this.artifactImagesService.removeFilter(this.filterId);
    // this.filterId = this.artifactImagesService.addFilter(artifact => {
    //   for (var person of artifact.authors) {
    //     if (person.id == authorId) {
    //       return true;
    //     }
    //   }
    //   return false;
    // })
    // this.selectedAuthorId1 = authorId;
  }

  private clearUnavailableElements() {
    d3.selectAll("line").classed("unavailableLink", false);
    d3.selectAll("circle").classed("unavailableNode", false);
  }

  private disableAllUnconnectedNodes(authorId: number) {
    let connectedNodeIds = this.findConnectedNodeIds(authorId);

    let unconnectedNodeIds = this.nodes
      .filter(node => !connectedNodeIds.includes(node.id) && (node.id != authorId))
      .map(node => node.id);

    unconnectedNodeIds.forEach(nodeId => {
      d3.select("#author" + nodeId)
        .classed("unavailableNode", true);
    })

    let unconnectedLinks = this.links
      .filter((link: any) => !(link.source.id == authorId) && !(link.target.id == authorId));

    unconnectedLinks.forEach((link: any) => {
      d3.selectAll(".link" + link.source.id + "-" + link.target.id)
        .classed("unavailableLink", true);
    });
  }

  private findConnectedNodeIds(rootNodeId: number): number[] {
    return this.links
      .filter((x: any) => x.source.id == rootNodeId || x.target.id == rootNodeId)
      .map((x: any) => x.source.id == rootNodeId ? x.target.id : x.source.id);
  }


}
