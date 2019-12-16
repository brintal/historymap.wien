import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ArtifactListComponent} from './artifact-management/artifact-list/artifact-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSliderModule} from "@angular/material/slider";
import {ArtifactTableComponent} from './artifact-management/artifact-table/artifact-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DummyComponent} from './artifact-management/dummy/dummy.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ArtifactImagePopupComponent} from './artifact-management/artifact-image-popup/artifact-image-popup.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { ArtifactMapComponent } from './artifact-map/artifact-map/artifact-map.component';
import { TemporalBarChartComponent } from './artifact-visualization/temporal-bar-chart/temporal-bar-chart.component';
import {D3Service} from "d3-ng2-service";

@NgModule({
  declarations: [
    AppComponent,
    ArtifactListComponent,
    ArtifactTableComponent,
    DummyComponent,
    ArtifactImagePopupComponent,
    ArtifactMapComponent,
    TemporalBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule
  ],
  entryComponents: [ArtifactImagePopupComponent],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule {
}
