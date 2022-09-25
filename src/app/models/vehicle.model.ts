export class VehicleModel {

  constructor(
    public id: number,
    public company: number,
    public codbt: string,
    public name: string,
    public type: number,
    public icon?: string, // eu uso ?: para dizer que essa variavel pode ser null e que não é obrigatório
  ) { }
}

// Criei essa classe de model para tipar de forma coerente que é a resposta da API
export class APIResponseModel {

  constructor(
      public data: VehicleModel,
      public success: boolean,
  ) { }

}
