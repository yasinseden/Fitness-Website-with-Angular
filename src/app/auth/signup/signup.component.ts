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
    userName: new FormControl('ashil', Validators.required),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('Yasin', Validators.required),
    lastName: new FormControl('Seden', Validators.required),
    email: new FormControl('yasin@yasin.com', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('5778962521', [Validators.required, Validators.maxLength(10)]), // Learn how to lock when input length become maxLength
    role: new FormControl('admin', Validators.required),
    birthYear: new FormControl('1990', Validators.required)
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
  
  /* 
  // This is an easier way to create a predifined object with values from the form
    // Assuming you have the predefined object as shown earlier
    predefinedObject = {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  
    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
      this.myForm = this.formBuilder.group(this.predefinedObject);
    }
  
    onSubmit() {
      // Merge the form values into the predefined object
      const dataToPost = { ...this.predefinedObject, ...this.myForm.value };
  */
}
