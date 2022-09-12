export class UserModel {

  constructor(
    public id: string,
    public company: any,
    public email: string,
    public firebase_uid: string,
    public username: string,
    public password: string,
    ) { }
}
