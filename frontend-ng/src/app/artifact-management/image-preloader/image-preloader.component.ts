import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ArtifactImageService} from "../../artifact-map/shared/artifact-image.service";

@Component({
  selector: 'app-image-preloader',
  templateUrl: './image-preloader.component.html',
  styleUrls: ['./image-preloader.component.scss']
})
export class ImagePreloaderComponent implements AfterViewInit {

  imgs = [];

  constructor(private artifactImagesService: ArtifactImageService) {
  }

  ngAfterViewInit(): void {
    this.artifactImagesService.artifactData$.subscribe(artifacts => {
      for (var i = 0; i < artifacts.length; i++) {
        this.imgs[i] = new Image();
        this.imgs[i].src = `/pictureStore/${artifacts[i].onbImageId}/iconWithoutBorder/${artifacts[i].onbImageId}.jpg`;
      }
    });
  }
}
