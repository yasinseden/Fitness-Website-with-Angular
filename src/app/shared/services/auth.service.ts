import { Injectable } from '@angular/core';
import { UserHttpService } from './user-http.service';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string = '';
  password: string = '';
  users: UserModel[] = [];

  constructor(private _userHttp: UserHttpService) {
    this._userHttp.getUsers();
  }

  isUserValid(userNameEmail: string, password: string): any[] {
    this.users = this._userHttp.users;
    const user = this.users.find(user => user.email === userNameEmail && user.password === password);
    const userArr = [!!user, user?.role];
    return userArr;
  }

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail() {
    return this.userEmail;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }
}
