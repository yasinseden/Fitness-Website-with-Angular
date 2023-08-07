import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';

@Component({
  selector: 'app-athlete-interface',
  templateUrl: './athlete-interface.component.html',
  styleUrls: ['./athlete-interface.component.css']
})
export class AthleteInterfaceComponent {

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

  constructor(private sidebarUserMediatorservice: SidebarUserMediatorService) {
    this.isSidebarOpenSubcription = this.sidebarUserMediatorservice.sidebarStatus$.subscribe(
      (isSidebarOpen: boolean) => {
        if (isSidebarOpen) {
          this.columnClass = 'col-10'
        } else {
          this.columnClass = 'col-12'
        }
      }
    )
  }

  changeUserCard() {
    this.toggleClass = 'change-user-card';
    setTimeout(() => {this.divSelection = !this.divSelection}, 600);
    setTimeout(() => {this.toggleClass = 'change-user-card-back'}, 650);
  }

  ngOnDestroy(): void {
    this.isSidebarOpenSubcription.unsubscribe();
  }
}
