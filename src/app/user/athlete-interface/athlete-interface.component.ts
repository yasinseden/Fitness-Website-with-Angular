import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { weightDataModel } from 'src/app/models/weight-data.model';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-athlete-interface',
  templateUrl: './athlete-interface.component.html',
  styleUrls: ['./athlete-interface.component.css']
})
export class AthleteInterfaceComponent implements AfterContentChecked {

  public userData: UserModel | null = null;
  public divSelection: boolean = true;
  public toggleClass: string = 'change-user-card-back'
  public columnClass: string = 'col-12'
  public weightDataForTemplate: any;
  private isSidebarOpenSubcription: Subscription;
  private userDataSubscription: Subscription;

  userInfoUpdateForm = new FormGroup({
    weight: new FormControl(''),
    height: new FormControl(''),
    targetWeight: new FormControl(''),
    neck: new FormControl(''),
    waist: new FormControl(''),
    gender: new FormControl(''),
    hips: new FormControl('')
  })

  constructor(
    private sidebarUserMediatorservice: SidebarUserMediatorService,
    private userInfoService: UserInfoService,
    private cdRef: ChangeDetectorRef,
    private userHttpService: UserHttpService
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

    this.userDataSubscription = this.userInfoService.userDataObservable$.subscribe((data) => {
      this.userData = data;
    })

    // It's not a good usage. Find a better way!!!!!
    if (!this.userData) {
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }

  onSubmit() {
    const formValue = this.userInfoUpdateForm.value;

    if (this.userData) {
      // Find better and shorter way to check values!!!!
      const weightData = new weightDataModel(formValue.weight as unknown as number);
      if (formValue.weight) {
        this.userData.bodyMeasurement.weight.push(weightData);
      }
      if (formValue.height) {
        this.userData.bodyMeasurement.height = formValue.height as string;
      }
      if (formValue.targetWeight) {
        this.userData.bodyMeasurement.targetWeight = formValue.targetWeight as string;
      }
      if (formValue.neck) {
        this.userData.bodyMeasurement.neck = formValue.neck as string;
      }
      if (formValue.waist) {
        this.userData.bodyMeasurement.waist = formValue.waist as string;
      }
      if (formValue.hips) {
        this.userData.bodyMeasurement.hips = formValue.hips as string;
      }
      if (formValue.gender) {
        this.userData.gender = formValue.gender as unknown as boolean;
      }

      this.userHttpService.patchUserData(this.userData, this.userData?.id)
      console.log(this.userData);
    }

    this.userInfoUpdateForm.reset();
  }

  changeUserCard() {
    this.toggleClass = 'change-user-card';
    setTimeout(() => { this.divSelection = !this.divSelection }, 600);
    setTimeout(() => { this.toggleClass = 'change-user-card-back' }, 650);
  }

     // It's working but not the best way. Find a better way!!!
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.isSidebarOpenSubcription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }
}
