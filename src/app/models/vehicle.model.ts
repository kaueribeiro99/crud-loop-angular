export class VehicleModel {

  constructor(
    public id: number,
    public company: number,
    public codbt: string,
    public name: string,
    public type: number,
    public icon?: string, // eu uso ?: para dizer que essa variavel não é obrigatória
  ) { }
}


export class APIResponseModel {

  constructor(
      public data: VehicleModel,
      public success: boolean,
  ) { }

}
