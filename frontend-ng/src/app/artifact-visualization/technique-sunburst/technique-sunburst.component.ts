import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Sunburst from 'sunburst-chart';
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

  private filterId: string;
  private currentNodeId: number;

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
      let mappedData = this.mapData(data);
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      let graph = Sunburst()
        .data(mappedData)
        .size('value')
        .width(400)
        .height(400)
        .onClick(node => {
          // @ts-ignore
          this.onClick(node);
          graph.focusOnNode(node);})
        // @ts-ignore
        .color(obj => {
          if (obj.name == 'Techniken') {
            return '#303030';
          }
          if (obj.__dataNode.parent != null && obj.__dataNode.parent.data.name != 'Techniken') {
            return d3.rgb(color(obj.__dataNode.parent.data.name)).brighter(1);
          }
          return color(obj.name);

        })
        .tooltipTitle(node => node.name)
        // .color((d, parent) => color(parent ? parent.data.name : null))
        .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
        (document.getElementById('chart'));
      subscription.unsubscribe();

      this.artifactImagesService.clearFilterNotify$.subscribe(value => {
        graph.focusOnNode(graph.data());
      });
    });
  }


  private onClick(node: SunburstDto) {
    this.artifactImagesService.removeFilter(this.filterId);
    this.filterId = this.artifactImagesService.addFilter(artifact => {
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
