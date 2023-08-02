import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _http: HttpClient) {}

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

  
  onSubmit() {
    const formValue = this.loginForm.value;
     this.password = formValue.password as string;
     this.userNameEmail = formValue.email as string;
  }
  
  isUserValid(userNameEmail: string, password: string): boolean {
    const user = this.users.find(user => user.email === userNameEmail && user.password === password);
    return !!user;
  }

  isUserValidClick() {
    if (this.isUserValid(this.userNameEmail, this.password)) {
      console.log('asddfasfknakf'); 
    } else {
      console.log('216416546');
    }

    console.log(this.userNameEmail);
    console.log(this.password);
    
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
