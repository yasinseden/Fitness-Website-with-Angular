import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  api: string = "http://localhost:3000/"
  users: UserModel[] = [];
  userNameEmail: string = '';
  password: string = '';

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private router: Router, private _http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls
  }

  getUsers() {
    this._http.get<any>(this.api + "users").subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log(err)
    })
  }

  // Modify and update as needed. Remember this isn't a nice code snippet. You can code better 
  onSubmit() {
    const formValue = this.loginForm.value;
    this.password = formValue.password as string;
    this.userNameEmail = formValue.email as string;

    const validation = this.isUserValid(this.userNameEmail, this.password)

    if (validation[0] == true && validation[1] == 'admin') {
      this.router.navigate(['/user/trainer']);
    } else if (validation[0] == true && validation[1] == 'user') {
      this.router.navigate(['/user/athlete']);
    } else {
      console.log('USER COULD NOT FIND');
      console.log(validation);
    }
  }

  isUserValid(userNameEmail: string, password: string): any[] {
    const user = this.users.find(user => user.email === userNameEmail && user.password === password);
    const arr = [!!user, user?.role]
    return arr;
  }


  /* Just for learning
  arr: any[] = [
    {size: 'large', color:'blue'},
    {size: 'medium', color:'red'},
    {size: 'small', color:'yellow'}
  ]

  isTrue(size:string, color:string): boolean {
    const item = this.arr.find(item => item.size === size && item.color=== color);
    return !!item;
  }

  isTrueClick() {
    if (this.isTrue('small', 'blue') == true) {
      console.log('True');
    } else {
      console.log('false');
    }
  }
  */
}
