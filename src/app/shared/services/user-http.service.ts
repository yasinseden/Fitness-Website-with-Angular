import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  api: string = "http://localhost:3000/"
  users: UserModel[] = [];

  constructor(private _http: HttpClient) {}

  getUsers() {
    this._http.get<any>(this.api + "users").subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log(err)
    })
  }

  postUser(user: any) {
    this._http.post<any>(this.api + "users", user).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
      
    })
  }
}
