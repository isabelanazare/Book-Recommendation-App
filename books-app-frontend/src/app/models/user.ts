import { EMPTY_STRING } from '../utils/constants';

export class User {
  public id?: string;
  public username: string = EMPTY_STRING;
  public email: string = EMPTY_STRING;
  public imgPath?: string = EMPTY_STRING;
  public password?: string = EMPTY_STRING;
  public token?: string;

  constructor(username: string, email: string, password?: string, imgPath?: string, id?: string) {
    this.username = username;
    this.email = email;
    this.imgPath = imgPath;
    this.password = password;
    this.id = id;
  }
}