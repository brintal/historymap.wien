import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-artifact-image-popup',
  templateUrl: './artifact-image-popup.component.html',
  styleUrls: ['./artifact-image-popup.component.scss']
})
export class ArtifactImagePopupComponent implements OnInit {


  imageId: string;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    console.log(data);
    this.imageId = data.imageId;
  }

  ngOnInit() {
  }
}
