import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APIAuth = 'https://api.360kpi.io/auth/authenticate'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // O service é usado para fazer o request da API
  authenticate(email: string, password: string):Promise<any>{
    return this.http.post(this.APIAuth, {email, password}).toPromise()
    .catch();
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login']);
  }
}

