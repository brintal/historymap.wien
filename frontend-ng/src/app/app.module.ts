import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

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
import {ArtifactMapComponent} from './artifact-map/artifact-map/artifact-map.component';
import {TemporalBarChartComponent} from './artifact-visualization/temporal-bar-chart/temporal-bar-chart.component';
import {TechniqueSunburstComponent} from './artifact-visualization/technique-sunburst/technique-sunburst.component';
import {ArtifactDetailsComponent} from './artifact-management/artifact-details/artifact-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ArtifactMapPopupComponent } from './artifact-map/artifact-map-popup/artifact-map-popup.component';
import {createCustomElement} from "@angular/elements";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    ArtifactListComponent,
    ArtifactTableComponent,
    DummyComponent,
    ArtifactImagePopupComponent,
    ArtifactMapComponent,
    TemporalBarChartComponent,
    TechniqueSunburstComponent,
    ArtifactDetailsComponent,
    ArtifactMapPopupComponent
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
        MatBottomSheetModule,
        MatDialogModule,
        MatSelectModule
    ],
  entryComponents: [ArtifactImagePopupComponent, ArtifactDetailsComponent, ArtifactMapPopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(ArtifactMapPopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
