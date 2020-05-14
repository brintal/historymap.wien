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
import { KeywordCloudComponent } from './artifact-visualization/keyword-cloud/keyword-cloud.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_RIPPLE_GLOBAL_OPTIONS, MatRippleModule, RippleGlobalOptions} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import { AuthorNetworkComponent } from './artifact-visualization/author-network/author-network.component';
import { ImagePreloaderComponent } from './artifact-management/image-preloader/image-preloader.component';
import { AuthorBubblesComponent } from './artifact-visualization/author-bubbles/author-bubbles.component';
import { FilterOverviewComponent } from './artifact-map/filter-overview/filter-overview.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import 'hammerjs';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: false
};

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
    ArtifactMapPopupComponent,
    KeywordCloudComponent,
    AuthorNetworkComponent,
    ImagePreloaderComponent,
    AuthorBubblesComponent,
    FilterOverviewComponent
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
    MatSelectModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatExpansionModule,
    MatRadioModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  entryComponents: [ArtifactImagePopupComponent, ArtifactDetailsComponent, ArtifactMapPopupComponent],
  providers: [{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(ArtifactMapPopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
