import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";
import {VehiclesFormComponent} from "./vehicles-form/vehicles-form.component";

const routes: Routes = [
  {
    path: '',
    component: VehiclesListComponent
  },
  {
    path: 'new',
    component: VehiclesFormComponent
  },
  {
    path: ':id/edit',
    component: VehiclesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
