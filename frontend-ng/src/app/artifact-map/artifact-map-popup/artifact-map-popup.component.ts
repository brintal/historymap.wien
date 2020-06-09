import {Component, Input, OnInit} from '@angular/core';
import {Artifact} from "../../shared/generated/domain";
import {EndpointSettings} from "../../shared/endpoint-settings";
import {ArtifactDetailsComponent} from "../../artifact-management/artifact-details/artifact-details.component";
import {MatDialog} from "@angular/material/dialog";
import {Marker} from "leaflet";

@Component({
  selector: 'app-artifact-map-popup',
  templateUrl: './artifact-map-popup.component.html',
  styleUrls: ['./artifact-map-popup.component.scss']
})
export class ArtifactMapPopupComponent implements OnInit {

  @Input() artifact: Artifact;
  @Input() nextMarker: Marker;
  @Input() previousMarker: Marker;

  constructor(
    private _dialog: MatDialog) {
  }

  ngOnInit() {
  }

  getImageSrc() {
    return `${EndpointSettings.API_ENDPOINT}pictureStore/${this.artifact.onbImageId}/medium/${this.artifact.onbImageId}.jpg`;
  }

  public openDetails() {
    history.pushState({}, "", "/map#");
    const dialogRef = this._dialog.open(ArtifactDetailsComponent, {
      data: this.artifact,
      maxHeight: '90vh',
      minWidth: '80vw',
      closeOnNavigation: true
    });
  }

  public next() {
    this.nextMarker.fire('click');
  }

  public previous() {
    this.previousMarker.fire('click');
  }


}
