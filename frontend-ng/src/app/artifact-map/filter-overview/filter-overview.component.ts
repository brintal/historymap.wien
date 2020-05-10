import { Component, OnInit } from '@angular/core';
import {ArtifactImageService} from "../shared/artifact-image.service";
import {Artifact} from "../../shared/generated/domain";
import * as D3 from "d3";
import {FilterDefinition} from "../../shared/filterDefinition";

@Component({
  selector: 'app-filter-overview',
  templateUrl: './filter-overview.component.html',
  styleUrls: ['./filter-overview.component.scss']
})
export class FilterOverviewComponent implements OnInit {

  filters: FilterDefinition[] = [];


  constructor(private artifactImagesService: ArtifactImageService) { }

  ngOnInit(): void {

    this.artifactImagesService.filters$.subscribe(filterChangeEvent => {
      this.filters = filterChangeEvent.filters;
    });
  }

  remove(filterId: string): void {
    this.artifactImagesService.removeFilterAndPublish(filterId);
  }

}
