import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {VehiclesService} from "../../../services/vehicles.service";
import {VehiclesFormComponent} from "../vehicles-form/vehicles-form.component";
import {MatDialog} from "@angular/material/dialog";
import {VehicleModel} from "../../../models/vehicle.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {style} from "@angular/animations";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements AfterViewInit, OnInit {

  public vehicles: any;
  public loading: boolean = false;

  displayedColumns: string[] = ['icon', 'codbt', 'name', 'options'];
  dataSource: MatTableDataSource<VehicleModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private vehicleService: VehiclesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.listVehicle()
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  listVehicle() {
    this.loading = true;

    // Uso o .data no result para pegar somente o array de dados da API
    // Salvo meu result.data em uma variável e chamo ela no dataSource para a paginação funcionar, depois inicializo a variavel no OnInit
    this.vehicleService.getVehicles().then((result: {success: boolean, data: VehicleModel}) => {
      this.vehicles = result.data;
      this.dataSource.data = this.vehicles;
    })
    .catch(error => {
      this.openSnackBar('Error downloading vehicles', 'Close', 'danger');
      console.log(error);
    })
    .finally(() => {
      this.loading = false;
    })
  }

  deleteVehicles(id: number, name: string) {
    this.dialogService.openConfirmDialog('Remove Vehicle', 'Are you sure you want to remove the vehicle ' + name + '?')
      .afterClosed().subscribe(response =>{
        if(response){
          this.loading = true;
          this.vehicleService.delVehicles(id).then(() => {
            this.listVehicle();
            this.openSnackBar('Vehicle deleted successfully', 'Close', 'success')
          })
            .catch(error => {
              this.openSnackBar('Error deleting vehicle', 'Close', 'danger');
              console.log(error);
            })
            .finally(() => {
              this.loading = false;
            });
        }
    });
}

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public openDialogVehicles(vehicle?: VehicleModel) {

    let action = 'create';

    if (vehicle) {
      action = 'edit';
    }

    let ref = this.dialog.open(VehiclesFormComponent, {
      panelClass: 'dialog',
      data: {
          action: action,
          vehicle: vehicle
      }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.listVehicle();
      }
    });
  }

  public openSnackBar(message: string, action: string, type: string){
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 3000,
      panelClass: 'snackBar-' + type
    });
  }
}


