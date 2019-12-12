import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { HtmlBarChartComponent } from './components/html-bar-chart/html-bar-chart.component';
import { SvgBarChartComponent } from './components/svg-bar-chart/svg-bar-chart.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import {D3GmapsComponent} from "./components/d3-gmaps/d3-gmaps.component";
import {D3LeafletComponent} from "./components/d3-leaflet/d3-leaflet.component";
import {ArtifactImagesService} from "./shared/artifact-images.service";
import {BrushSnappingComponent} from "./components/brush-snapping/brush-snapping.component";


@NgModule({
  declarations: [
    AppComponent,
    HtmlBarChartComponent,
    SvgBarChartComponent,
    VerticalBarChartComponent,
    D3GmapsComponent,
    D3LeafletComponent,
    BrushSnappingComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ArtifactImagesService,
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
