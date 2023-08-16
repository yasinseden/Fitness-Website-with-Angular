import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  api: string = "http://localhost:3000/"
  userNameEmail: string = '';
  password: string = '';

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private router: Router,
    private auth: AuthService,
    private userHttp: UserHttpService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.password = formValue.password as string;
    this.userNameEmail = formValue.email as string;


    // To set logged in user email and password
    this.auth.setEmail(this.userNameEmail);
    this.auth.setPassword(this.password);


    // To send data to localstorage
    const currentUserKey = 'currentUserDataKey'
    this.userHttp.getUserByEmailAndPassword(this.userNameEmail, this.password).subscribe((data) => {
      if (data && data.length > 0) {
        const userData = data[0];
        const dataAsString = JSON.stringify(userData)
        localStorage.setItem(currentUserKey, dataAsString)
      }
    })

    // To login validation control and navigation according to response
        // It's working but not the best solution!!!!!!
    setTimeout(() => {
      const validation = this.auth.isUserValid(this.userNameEmail, this.password);
      if (validation[0] == true && validation[1] == 'admin') {
        this.router.navigate(['/user/trainer']);
      } else if (validation[0] == true && validation[1] == 'user') {
        this.router.navigate(['/user/athlete']);
      } else {
        console.log('USER COULD NOT FIND');
        console.log(validation);
      }
    }, 150);

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
