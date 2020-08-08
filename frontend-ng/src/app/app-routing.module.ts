import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtifactListComponent} from "./artifact-management/artifact-list/artifact-list.component";
import {ArtifactMapComponent} from "./artifact-map/artifact-map/artifact-map.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'list', component: ArtifactListComponent},
  {path: 'map', component: ArtifactMapComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
