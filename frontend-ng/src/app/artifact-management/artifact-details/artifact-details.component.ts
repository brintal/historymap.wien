import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Artifact} from "../../shared/generated/domain";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-artifact-details',
  templateUrl: './artifact-details.component.html',
  styleUrls: ['./artifact-details.component.scss']
})
export class ArtifactDetailsComponent implements OnInit {

  public tableData: string[][] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Artifact, private sanitizer: DomSanitizer) {
    this.tableData.push(["Title", data.title]);
    this.tableData.push(["Additional Title", data.additionalTitle]);
    this.tableData.push(["Year", data.year.toString()]);
    this.tableData.push(["ID", data.id.toString()]);
    this.tableData.push(["ONB ID", data.onbImageId.toString()]);
    this.tableData.push(["Description", data.description]);
    this.tableData.push(["Corporate Body", data.corporateBody]);
    this.tableData.push(["Place", data.place]);
    this.tableData.push(["Address", data.address]);
    this.tableData.push(["Inventory Number", data.inventoryNumber]);
    this.tableData.push(["District", data.district.toString()]);
    this.tableData.push(["Digital Collection", data.digitalCollection]);
    this.tableData.push(["Date Text", data.dateText]);
    this.tableData.push(["Technique", this.getTechniqueName()]);
    this.tableData.push(["Technique Category", this.getCategoryName()]);
    this.tableData.push(["Authors", this.getAuthors()]);
    this.tableData.push(["Keywords", this.getKeywords()]);
    this.tableData.push(["Location", data.location.latitude + " " + data.location.longitude]);
  }

  ngOnInit() {
  }

  private getTechniqueName(): string {
    if (this.data.technique === null) {
      return "";
    } else {
      return this.data.technique.name;
    }
  }

  private getCategoryName(): string {
    if (this.data.technique === null || this.data.technique.category === null) {
      return "";
    } else {
      return this.data.technique.category.name;
    }
  }

  private getKeywords(): string {
    return this.data.keywords.map(keyword => keyword.value).join(", ");
  }

  private getAuthors(): string {
    return this.data.authors.map(person => person.name).join(" | ");
  }

  getStreetviewUrl(): SafeResourceUrl {
    let url = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBYV-WN6EWN4EBpHdq-5tr1x-mfpvFzPy4&location=${this.data.location.latitude}%2C${this.data.location.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
