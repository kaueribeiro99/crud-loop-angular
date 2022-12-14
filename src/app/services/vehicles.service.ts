import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VehicleModel} from "../models/vehicle.model";
import {delay, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  vehicle: VehicleModel[] = [];

  private readonly APIVehicle = 'https://api.360kpi.io/planning/vehicle'

  constructor(
      private http: HttpClient,
  ) { }

  // Esse método guarda o header que é necessário chamar na API
  async apiHeader(): Promise<HttpHeaders> {
    let token: any = sessionStorage.getItem('firebase');
    let refresh: any = sessionStorage.getItem('refresh');
    let business: any = sessionStorage.getItem('business-app');
    let company: any = sessionStorage.getItem('company');

    return new HttpHeaders({
      'firebase': token,
      'refresh': refresh,
      'business-app': business,
      'company': company
    })
  }

  // O service é usado para fazer o request da API
  async getVehicles():Promise<any>{

    let headers = await this.apiHeader()

    return this.http.get<VehicleModel[]>(this.APIVehicle, {headers: headers })
      .toPromise()
      .catch()
  }

  async postVehicles(body: VehicleModel):Promise<any>{

    let headers = await this.apiHeader()

    return this.http.post<VehicleModel[]>(this.APIVehicle, body, {headers: headers})
      .toPromise()
      .catch()
  }

  async putVehicles(id: number, body: VehicleModel):Promise<any>{

    let headers = await this.apiHeader()

    return this.http.put<VehicleModel[]>(this.APIVehicle + '/' + id, body, {headers: headers})
      .toPromise()
      .catch()
  }

  async delVehicles(id: number):Promise<any>{

    let headers = await this.apiHeader()

    return this.http.delete<VehicleModel>(this.APIVehicle + '/' + id, {headers:headers})
      .toPromise()
      .catch()
  }
}
