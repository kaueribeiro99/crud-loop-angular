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

  //Uso o !: para não precisar implementar um valor para a variável
  title!: string; // title da página randômico
  action!: string; // ação para saber se o usuário está editando ou incluindo
  vehicle!: VehicleModel;
  loading: boolean = false;
  vehicleForm!: FormGroup; // inicializo o formGroup aqui
  idVehicle!: number; // uso essa variavél para saber se a requisição já possui ID


  constructor(
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private vehicleService: VehiclesService,
      public dialog: MatDialogRef<VehiclesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: VehiclesFormComponent
  ) {}

  ngOnInit() {
    this.formValidators();
    this.logicDialog();
  }

  // Método para diferenciar o dialogo quando a ação é de Edit e quando é de Create
  logicDialog(){
    this.title = this.data.title;
    this.action = this.data.action;
    this.idVehicle = this.data.idVehicle;
    if (this.action == 'edit') {
      this.vehicle = this.data.vehicle;
      this.idVehicle = this.data.vehicle.id;
      this.vehicle.type = type;
      this.title = 'Edit Vehicle';
      this.populateForm(this.vehicle);
    } else {
      this.vehicle = this.data.vehicle;
      this.title = 'New Vehicle';
    }
  }

  // Método para validar os inputs
  formValidators() {
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

      if (this.action == 'edit' && this.idVehicle) { // Verifico se a ação é o click no botão de Editar e se tem ID no request, se sim, eu preencho o form e chamo o método de Update
        this.vehicleService.putVehicles(this.idVehicle, this.vehicleForm.value).then(response_api  => {
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
      } else { // Se não tiver ID e a ação não for de Edit, eu chamo o método de Create com o form limpo

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

  // Método para pegar os icons do projeto
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

  // Método para verificar se posso ou não fechar o dialogo
  closeDialog(saved_close: boolean) {
    if (saved_close) {
      this.dialog.close(this.vehicle)
    }
    else {
      this.dialog.close()
    }
  }
}

