import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ArtifactService} from "../shared/artifact.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ArtifactImagePopupComponent} from "../artifact-image-popup/artifact-image-popup.component";
import {Artifact} from "../../shared/artifact";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-artifact-table',
  templateUrl: './artifact-table.component.html',
  styleUrls: ['./artifact-table.component.scss']
})
export class ArtifactTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Artifact>;
  dataSource: MatTableDataSource<Artifact>;
  initialized: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['icon', 'id', 'title', 'year', 'longitude', 'latitude'];

  constructor(private artifactService: ArtifactService,
              private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.artifactService.getArtifacts().subscribe(artifacts => {
      this.dataSource = new MatTableDataSource<Artifact>(artifacts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initialized = true;
    });

  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openBottomSheet(id: string, longitude: number, latitude: number) {
    this._bottomSheet.open(ArtifactImagePopupComponent, {
      data: {
        imageId: id,
        longitude: longitude,
        latitude: latitude
      }
    })
  }
}
