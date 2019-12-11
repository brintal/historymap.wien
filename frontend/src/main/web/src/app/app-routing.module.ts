import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlBarChartComponent } from './components/html-bar-chart/html-bar-chart.component';
import { SvgBarChartComponent } from './components/svg-bar-chart/svg-bar-chart.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import {D3GmapsComponent} from "./components/d3-gmaps/d3-gmaps.component";
import {D3LeafletComponent} from "./components/d3-leaflet/d3-leaflet.component";
import {BrushSnappingComponent} from "./components/brush-snapping/brush-snapping.component";
const routes: Routes = [
  { path: '', redirectTo: '/d3-leaflet', pathMatch: 'full' },
  { path: 'html-bar-chart',  component: HtmlBarChartComponent },
  { path: 'svg-bar-chart',  component: SvgBarChartComponent },
  { path: 'vertical-bar-chart',  component: VerticalBarChartComponent },
  { path: 'd3-gmaps',  component: D3GmapsComponent },
  { path: 'd3-leaflet',  component: D3LeafletComponent},
  { path: 'brush-snapping',  component: BrushSnappingComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
