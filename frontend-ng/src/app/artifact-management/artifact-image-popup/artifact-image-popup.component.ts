import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ApikeyService} from "../../shared/apikey.service";

@Component({
  selector: 'app-artifact-image-popup',
  templateUrl: './artifact-image-popup.component.html',
  styleUrls: ['./artifact-image-popup.component.scss']
})
export class ArtifactImagePopupComponent implements OnInit {

  imageId: string;
  longitude: number;
  latitude: number;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public sanitizer: DomSanitizer, private apikeyService: ApikeyService) {
    this.imageId = data.imageId;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
  }

  ngOnInit() {
  }

  getStreetviewUrl(): SafeResourceUrl {
    let url = `https://www.google.com/maps/embed/v1/streetview?key=${this.apikeyService.googleApiKey}&location=${this.latitude}%2C${this.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
