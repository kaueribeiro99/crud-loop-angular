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
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements AfterViewInit, OnInit {

  public vehicles: VehicleModel[] = [];
  public loading: boolean = false;

  displayedColumns: string[] = ['icon', 'codbt', 'name', 'options'];
  dataSource: MatTableDataSource<VehicleModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private vehicleService: VehiclesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.listVehicle() //Chamo o método de listar os veiculos no OnInit para quando logar, já listar os veiculos na tabela
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialogVehicles(vehicle?: VehicleModel) {


    // tirar essa ação
    let action = 'create';

    if (vehicle) {
      action = 'edit';
    }

    let ref = this.dialog.open(VehiclesFormComponent, {
      panelClass: 'dialog',
      autoFocus: false,
      data: {
        action: action,
        vehicle: vehicle
      }
    });

    // Uso essa função para saber se o veiculo foi salvo na tabela, se o retorno da API for success, eu listo os veiculos
    ref.afterClosed().subscribe(result => {
      console.log(result)
      if (result.success) {
        this.listVehicle();
      }
    });
  }

  listVehicle() {
    this.loading = true;

    // Uso o .data no result para pegar somente o array de dados da API
    // Salvo meu result.data em uma variável e chamo ela no dataSource para a paginação funcionar, depois inicializo a variavel no OnInit
    this.vehicleService.getVehicles().then((response_api) => {
      this.vehicles = response_api.data;
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

  // O resultado do meu dialogo retorna true ou false, se for true, eu chamo o a api de delete e listo os veiculos
  deleteVehicles(id: number, name: string) {
    this.dialogService.openConfirmDialog('Remove Vehicle', 'Are you sure you want to remove the vehicle ' + name + '?')
      .afterClosed().subscribe(result_dialog => {
        if(result_dialog){
          this.loading = true;
          this.vehicleService.delVehicles(id).then(() => {
            this.listVehicle();
            this.openSnackBar('Vehicle deleted successfully', 'Close', 'success');
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


  public openSnackBar(message: string, action: string, type: string){
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 3000,
      panelClass: 'snackBar-' + type
    });
  }

  onLogout() {
    this.authService.logout()
  }
}


