export class AuthModel {
  constructor(
    public id: string,
    public token: string,
    public refreshToken:string,
  ) {}
}
