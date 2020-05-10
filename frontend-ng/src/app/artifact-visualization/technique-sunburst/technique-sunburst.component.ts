import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Sunburst, {SunburstChartInstance} from 'sunburst-chart';
import {HttpClient} from "@angular/common/http";
import * as d3 from 'd3';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";
import {Artifact} from "../../shared/generated/domain";

enum SunburstDtoType {
  TOPLEVEL,
  CATEGORY,
  TECHNIQUE
}

type SunburstDto = { name: string, value: number; children: SunburstDto[]; id: number; type: SunburstDtoType };

@Component({
  selector: 'app-technique-sunburst',
  templateUrl: './technique-sunburst.component.html',
  styleUrls: ['./technique-sunburst.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TechniqueSunburstComponent implements OnInit {

  private filterId: string = "TECHNIQUE_SUNBURST_FILTER";
  private currentNodeId: number;
  private currentSelectedNode;
  private data: Artifact[];
  private graph: SunburstChartInstance;
  private colorMap: Map<string, any>;

  constructor(private http: HttpClient, private artifactImagesService: ArtifactImageService) {
  }

  private getSunburstDtoChild(sunburstDto: SunburstDto, childName: string): SunburstDto {
    for (var child of sunburstDto.children) {
      if (child.name == childName) {
        return child;
      }
    }
    return null;
  }

  ngOnInit() {


    let subscription = this.artifactImagesService.artifactData$.subscribe(data => {
      this.data = data;
      let graph = this.initSunburstGraph(data);
      subscription.unsubscribe();

      // this.artifactImagesService.clearFilterNotify$.subscribe(value => {
      //   this.initSunburstGraph(this.data)
      //   graph.focusOnNode(graph.data());
      // });
    });

    this.artifactImagesService.filters$.subscribe(filterChangeEvent => {

      if (filterChangeEvent.triggerFilterId != null && filterChangeEvent.triggerFilterId == this.filterId) return;
      let filteredData: Artifact[] = [];
      this.data.forEach(artifact => {
        filteredData.push(artifact);
      })
      for(var filter of filterChangeEvent.filters) {
        filteredData = filteredData.filter(filter.filterFunction);
      }
      this.initSunburstGraph(filteredData);

    });
  }

  private initColors(root: SunburstDto) {
    this.colorMap = new Map<string, any>();
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    for (var child of root.children) {
      this.colorMap.set(child.name, color(child.name));
    }
  }


  private initSunburstGraph(data: Artifact[]) {
    d3.select("#chart").selectAll("*").remove();
    d3.selectAll(".sunburst-tooltip").remove();
    let mappedData = this.mapData(data);

    if (this.colorMap == null) {
      this.initColors(mappedData);
    }

    this.graph = Sunburst()
      .data(mappedData)
      .size('value')
      .width(400)
      .height(400)
      .onClick(node => {
        // @ts-ignore
        this.onClick(node);
        this.graph.focusOnNode(node);
      })
      // @ts-ignore
      .color(obj => {
        if (obj.name == 'Techniken') {
          return '#303030';
        }
        if (obj.__dataNode.parent != null && obj.__dataNode.parent.data.name != 'Techniken') {
          return d3.rgb(this.colorMap.get(obj.__dataNode.parent.data.name)).brighter(1);
        }
        return this.colorMap.get(obj.name);

      })
      .tooltipTitle(node => node.name)
      // .color((d, parent) => color(parent ? parent.data.name : null))
      .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
      (document.getElementById('chart'));

    if(this.currentNodeId != null) {
      // @ts-ignore
      let nodeToFocus = this.findNodeWithId(this.currentNodeId, this.graph.data())
      if (nodeToFocus != null ){
        this.graph.focusOnNode(nodeToFocus);
      }
    }
  }

  private findNodeWithId(nodeIdToFind: number,  currentNode: SunburstDto): SunburstDto {

    if (currentNode.id == nodeIdToFind) {
      return currentNode;
    }
    if (currentNode.children == null || currentNode.children.length == 0) {
      return null;
    }

    let foundNode: SunburstDto;
    for (var child of currentNode.children) {
      foundNode = this.findNodeWithId(nodeIdToFind, child);
      if (foundNode != null) {
        return foundNode;
      }
    }
    return null;
  }

  private onClick(node: SunburstDto) {
    this.currentNodeId = node ? node.id : 0;
    if (node == null) return; //no data. no need to add filter
    if (node.id == 0) { //node id is root element Techniken. Clicking on it means mother element is selected and no filters should be applied anymore.
      this.artifactImagesService.removeFilterAndPublish(this.filterId);
      return;
    }
    this.filterId = this.artifactImagesService.addFilterById(this.filterId,
        `Technique: ${node.name}`,
        artifact => {
      if (node == null || node.type == null || node.type == SunburstDtoType.TOPLEVEL) {
        return true;
      }
      if (node.type == SunburstDtoType.CATEGORY && node.name == this.NOT_DEFINED_QUALIFIER) {
        return (artifact.technique == null);
      }
      if (node.type == SunburstDtoType.CATEGORY) {
        return (artifact.technique != null && artifact.technique.category.id == node.id);
      } else {
        return artifact.technique != null && artifact.technique.id == node.id;
      }
    },
      () => {
      this.currentSelectedNode = null;
      this.currentNodeId = null;
      this.initSunburstGraph(this.data);
      this.graph.focusOnNode(this.graph.data());
      })
  }

  private readonly NOT_DEFINED_QUALIFIER = 'not defined';

  private mapData(data: Artifact[]) {
    let mappedData: SunburstDto = {name: 'Techniken', children: [], value: null, id: 0, type: SunburstDtoType.TOPLEVEL};
    let unassigned: SunburstDto = {
      name: this.NOT_DEFINED_QUALIFIER,
      children: null,
      value: 0,
      id: -1,
      type: SunburstDtoType.CATEGORY
    }
    mappedData.children.push(unassigned);

    for (var artifact of data) {
      if (artifact.technique == null) {
        unassigned.value++;
      } else {
        let categoryDto: SunburstDto = this.getSunburstDtoChild(mappedData, artifact.technique.category.name);
        if (categoryDto == null) {
          categoryDto = {
            name: artifact.technique.category.name,
            children: [],
            value: null,
            id: artifact.technique.category.id,
            type: SunburstDtoType.CATEGORY
          }
          mappedData.children.push(categoryDto);
        }
        let techniqueDto: SunburstDto = this.getSunburstDtoChild(categoryDto, artifact.technique.name)
        if (techniqueDto == null) {
          techniqueDto = {
            name: artifact.technique.name,
            children: null,
            value: 1,
            id: artifact.technique.id,
            type: SunburstDtoType.TECHNIQUE
          }
          categoryDto.children.push(techniqueDto);
        } else {
          techniqueDto.value++;
        }
      }
    }
    return mappedData;
  }
}
