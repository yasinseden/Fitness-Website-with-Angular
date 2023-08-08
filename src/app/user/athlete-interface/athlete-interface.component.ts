import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';

@Component({
  selector: 'app-athlete-interface',
  templateUrl: './athlete-interface.component.html',
  styleUrls: ['./athlete-interface.component.css']
})
export class AthleteInterfaceComponent {


  public userData: any;
  public divSelection: boolean = true;
  public toggleClass: string = 'change-user-card-back'
  public columnClass: string = 'col-12'
  private isSidebarOpenSubcription: Subscription;

  userInfoUpdate = new FormGroup({
    weight: new FormControl(''),
    height: new FormControl(''),
    targetWeight: new FormControl(''),
    neck: new FormControl(''),
    waist: new FormControl(''),
    gender: new FormControl(''),
    hips: new FormControl('')
  })

  constructor(
    private auth: AuthService,
    private sidebarUserMediatorservice: SidebarUserMediatorService,
    private http: UserHttpService,
  ) {
    this.isSidebarOpenSubcription = this.sidebarUserMediatorservice.sidebarStatus$.subscribe(
      (isSidebarOpen: boolean) => {
        if (isSidebarOpen) {
          this.columnClass = 'col-10'
        } else {
          this.columnClass = 'col-12'
        }
      }
    )

    const userEmail = this.auth.getEmail();
    const userPassword = this.auth.getPassword();

    this.http.getUserByEmailAndPassword(userEmail, userPassword).subscribe((data) => {
      this.userData = data[0]
    })

    console.log(this.userData);
    
  }

  changeUserCard() {
    this.toggleClass = 'change-user-card';
    setTimeout(() => { this.divSelection = !this.divSelection }, 600);
    setTimeout(() => { this.toggleClass = 'change-user-card-back' }, 650);

    console.log(this.userData);
    
  }

  ngOnDestroy(): void {
    this.isSidebarOpenSubcription.unsubscribe();
  }
}
