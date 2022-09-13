import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
        private router: Router
  ) { }

  // Método para não deixar o usuário acessar outras páginas direto da URL
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | any {

    if (sessionStorage['firebase'] != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
