import {Component, OnInit} from '@angular/core';
import {ArtifactService} from "../shared/artifact.service";
import {Artifact} from "../../shared/generated/domain";

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent implements OnInit {

  artifacts: Artifact[] = [];

  constructor(private artifactService: ArtifactService) {
  }

  ngOnInit() {
    // this.getArtifacts();
  }

  getArtifacts(): void {
    this.artifactService.getArtifacts()
      .subscribe(artifacts => artifacts.forEach((artifact) => {
        console.log(artifact.onbImageId + ' ' + artifact.title);
        })
      );
  }

}
