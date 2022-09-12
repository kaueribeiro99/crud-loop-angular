import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehiclesRoutingModule} from './vehicles-routing.module';
import {VehiclesListComponent} from "./vehicles-list/vehicles-list.component";
import {VehiclesFormComponent} from "./vehicles-form/vehicles-form.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    VehiclesListComponent,
    VehiclesFormComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class VehiclesModule { }
