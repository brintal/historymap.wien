import {Component, OnInit} from '@angular/core';
import {Artifact} from "../../shared/generated/domain";

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent implements OnInit {

  artifacts: Artifact[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
