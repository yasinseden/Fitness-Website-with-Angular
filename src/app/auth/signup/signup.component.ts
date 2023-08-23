import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UserHttpService } from 'src/app/shared/services/user-http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  api: string = "http://localhost:3000/"

  signupForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]), // Learn how to lock when input length become maxLength
    role: new FormControl('', Validators.required),
    birthYear: new FormControl('', Validators.required)
  })

  constructor(private userHttp: UserHttpService) {}
  
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls
  }

  // with these code I can modify the birth year range whenever I want
  getYearsRange(): number[] {
    const startYear = 1985;
    const endYear = 2005;
    const years: number[] = [];

    for (let i = endYear; i >= startYear; i--) {
      years.push(i);
    }

    return years;
  }

  // Modify as needed 
  onSubmit() {
    const formValues = this.signupForm.value;
    const user: UserModel = new UserModel;
    user.firstName = (formValues.firstName) as string  // it's a usefull usage for resolve type error like " let a: string | null; let b: string " with this usage there won't occur a type error
    user.lastName = (formValues.lastName) as string
    user.userName = (formValues.userName) as string
    user.password = (formValues.password) as string
    user.email = (formValues.email) as string
    user.phoneNumber = (formValues.phoneNumber) as string
    user.role = (formValues.role) as string
    user.birthYear = formValues.birthYear

    this.userHttp.postUser(user);
  }
}
