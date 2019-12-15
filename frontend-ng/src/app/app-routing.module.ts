import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtifactListComponent} from "./artifact-management/artifact-list/artifact-list.component";
import {DummyComponent} from "./artifact-management/dummy/dummy.component";

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ArtifactListComponent},
  {path: 'dummy', component: DummyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
