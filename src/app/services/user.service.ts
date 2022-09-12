import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthModel} from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly APIUser = 'https://api.360kpi.io/core/users-login/'

  constructor(
      private http: HttpClient,
  ) { }

  // O service é usado para fazer o request da API
  user(token:any, refreshtoken:any, uid: any):Promise<any>{
    let headers = new HttpHeaders({'firebase': token, 'refresh': refreshtoken});

    return this.http.get<AuthModel>(this.APIUser + uid, { headers:headers })
      .toPromise()
      .catch();
  }
}
