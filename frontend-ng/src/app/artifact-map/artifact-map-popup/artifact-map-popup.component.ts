import {Component, Input, OnInit} from '@angular/core';
import {Artifact} from "../../shared/generated/domain";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {ArtifactDetailsComponent} from "../../artifact-management/artifact-details/artifact-details.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-artifact-map-popup',
  templateUrl: './artifact-map-popup.component.html',
  styleUrls: ['./artifact-map-popup.component.scss']
})
export class ArtifactMapPopupComponent implements OnInit {

  @Input() artifact: Artifact;

  constructor(
    private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  getImageSrc() {
    return `${EndpointSettings.API_ENDPOINT}pictureStore/${this.artifact.onbImageId}/medium/${this.artifact.onbImageId}.jpg`;
  }

  public openDetails() {
    const dialogRef = this._dialog.open(ArtifactDetailsComponent, {
      data: this.artifact,
      maxHeight: '90vh',
      minWidth: '80vw'
    });
  }
}
