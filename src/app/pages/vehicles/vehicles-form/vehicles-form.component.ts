import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehicleModel} from "../../../models/vehicle.model";
import {VehiclesService} from "../../../services/vehicles.service";

let type: number = 0;
let company: number = 429;

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})

export class VehiclesFormComponent implements OnInit {


  title: string; //title da página randômico
  action: string; // ação para saber se o usuário está editando ou incluindo
  vehicle: VehicleModel;
  loading: boolean = false;
  vehicleForm!: FormGroup; //inicializo o formGroup aqui


  constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private vehicleService: VehiclesService,
      public dialog: MatDialogRef<VehiclesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: VehiclesFormComponent
  ) {
    this.title = this.data.title;
    this.action = this.data.action;
    if (this.action == 'edit') {
      this.vehicle = this.data.vehicle;
      this.vehicle.type = type;
    } else {
      this.vehicle = this.data.vehicle;
    }

  }

  ngOnInit() {
    this.inputValidators()

    if (this.action == 'edit') {
      this.title = 'Edit Vehicle';
      this.populateForm(this.vehicle)

    } else {
      this.title = 'New Vehicle'
    }
  }

  inputValidators() {
    this.vehicleForm = this.formBuilder.group({
      icon: [null],
      name: [null, Validators.required],
      codbt: [null, Validators.required],
      type: [null],
      company: [null]
    });
  }

  async saveVehicle(close: boolean) {
    if (this.vehicleForm.valid) { // Aqui eu válido o form antes de fazer qualquer ação

      this.loading = true;

      if (this.action == 'edit') { // Verifico se a ação é o click no botão de Editar, se sim, eu preencho o form e chamo o método de Update
        this.vehicleService.putVehicles(this.vehicle.id, this.vehicleForm.value).then(response_api  => {
          this.vehicle = response_api;
          this.openSnackBar('Vehicle updated successfully', 'Close', 'success');
          if (close)
            this.closeDialog(true);
        })
        .catch(error => {
          this.openSnackBar('Error updated vehicle', 'Close', 'danger');
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        })
      } else { // Se não tiver ID, eu chamo o método de Create com o form limpo

        let icon = this.vehicleForm.get('icon')?.value
        let codbt = this.vehicleForm.get('codbt')?.value
        let name = this.vehicleForm.get('name')?.value

        this.vehicleService.postVehicles(icon, codbt, name, type, company).then(response_api => {
          this.vehicle = response_api;
          this.openSnackBar('Vehicle created successfully', 'Close', 'success');
          if (close)
            this.closeDialog(true);
        })
        .catch(error => {
          this.openSnackBar('Error created vehicle', 'Close', 'danger');
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        })
      }
    }
  }

  public onIconSelected = (icon: string) => {
    this.vehicleForm.patchValue({'icon': icon});
  };

  // Método para preencher o form com os dados
  populateForm(vehicle: VehicleModel) {
    this.vehicleForm.patchValue(vehicle);
  }

  // Método para desabilitar o botão de Save antes de preencher os campos obrigatórios
  canSave(): boolean {
    return this.vehicleForm.valid && !this.loading;
  }

  // Método para mostrar um alerta para o usuário
  public openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 3000,
      panelClass: 'snackBar-' + type
    });
  }

  closeDialog(saved_close: boolean) {
    this.dialog.close(saved_close)
  }
}

