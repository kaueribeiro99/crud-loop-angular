import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthModel} from "../../models/auth.model";
import {UserModel} from "../../models/user.model";
import {VehiclesService} from "../../services/vehicles.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginForm !: FormGroup; // inicializo o formGroup aqui

  constructor(
      private authService: AuthService,
      private userService: UserService,
      private vehicleService: VehiclesService,
      private router: Router,
      private formBuilder: FormBuilder, // Usado para pegar as informações digitas no input do html
      private _snackBar: MatSnackBar
  ) {}
  // Inicializo no OnInit as validações do input e-mail e senha
  ngOnInit() {
   this.inputValidators()
  }

  inputValidators(){
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  // Método onde eu me autentico na API e salvo a resposta no sessionStorage
   login(){
    if (this.loginForm.valid) {

      this.loading = true;

      let email = this.loginForm.get('email')?.value
      let password = this.loginForm.get('password')?.value
      this.authService.authenticate(email, password)
        .then((result: {success: boolean, data: AuthModel}) => {
          console.log(result)
          if (result.success) {

            let company: any =  429;
            let businessapp: any = 1;

            // Salvando resultado no sessionStorage
            sessionStorage.setItem('firebase', result.data.token)
            sessionStorage.setItem('refresh', result.data.refreshToken)
            sessionStorage.setItem('uid', result.data.id)
            sessionStorage.setItem('business-app', businessapp)
            sessionStorage.setItem('company', company)

            this.router.navigate(['/vehicles'])
          }
          else {
            this.loading = false;
            this.openSnackBar('Invalid email or password', 'Close', 'danger')
            this.router.navigate(['/login'])
          }

      // Pegando os dados salvos no sessionStorage para adicionar no headers da requisição do usuário o campo "company"
      let token = sessionStorage.getItem('firebase')
      let refreshtoken = sessionStorage.getItem('refresh')
      let uid = sessionStorage.getItem('uid')
      this.userService.user(token, refreshtoken, uid)
        .then((result: {success: boolean, data: UserModel}) => {
        console.log(result)
          if (result.success){
            sessionStorage.setItem('company', result.data.company)
          }
      }).catch();
      }).catch();
    }
  }


  // Método para mostrar um alerta para o usuário
  public openSnackBar(message: string, action: string, type: string){
    this._snackBar.open(message, action, {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 4000,
      panelClass: 'snackBar-' + type //Criado um CSS global de cores do snackBar (snackBar-success, snackBar-warning)
    });
  }
}
