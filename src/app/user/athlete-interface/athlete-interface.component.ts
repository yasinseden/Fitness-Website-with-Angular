import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { weightDataModel } from 'src/app/models/weight-data.model';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { AthleteChartComponent } from 'src/app/standalone-components/athlete-chart/athlete-chart.component';

@Component({
  selector: 'app-athlete-interface',
  templateUrl: './athlete-interface.component.html',
  styleUrls: ['./athlete-interface.component.css']
})
export class AthleteInterfaceComponent implements AfterContentChecked {

  public centered = true;
  public userData: UserModel | null = null;
  public divSelection: boolean = true;
  public loadChartComponent: boolean = false;
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
    private userHttpService: UserHttpService) {

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
    
    
  }



  @ViewChild('athleteChartComponentRef') athleteChartComponentRef: AthleteChartComponent | undefined; 

  onSubmit() {
    const formValue = this.userInfoUpdateForm.value;
    const userModel: UserModel = new UserModel

    if (this.userData) {
      // Find better and shorter way to check values!!!!
      // userModel variable is for calculate the lean body mass instantaneously
      if (formValue.height) {
        this.userData.bodyMeasurement.height = formValue.height as unknown as number;
        userModel.bodyMeasurement.height = formValue.height as unknown as number
      }
      if (formValue.targetWeight) {
        this.userData.bodyMeasurement.targetWeight = formValue.targetWeight as unknown as number;
      }
      if (formValue.neck) {
        this.userData.bodyMeasurement.neck = formValue.neck as unknown as number;
        userModel.bodyMeasurement.neck = formValue.neck as unknown as number
      }
      if (formValue.waist) {
        this.userData.bodyMeasurement.waist = formValue.waist as unknown as number;
        userModel.bodyMeasurement.waist = formValue.waist as unknown as number;
      }
      if (formValue.hips) {
        this.userData.bodyMeasurement.hips = formValue.hips as unknown as number;
        userModel.bodyMeasurement.hips = formValue.hips as unknown as number;
      }
      if (formValue.gender) {
        this.userData.gender = formValue.gender as unknown as string;
        userModel.gender = formValue.gender as unknown as string;
      }
      const weightData = new weightDataModel(formValue.weight as unknown as number, userModel, this.userData);
      if (formValue.weight) {
        this.userData.bodyMeasurement.weight.push(weightData);
      }
      
      this.userInfoService.setUserData(this.userData)
      
      this.userHttpService.patchUserData(this.userData, this.userData?.id)

      // This method dynamically updates the chart. It's taken from child component (AthleteChartComponent)
      this.athleteChartComponentRef?.pushData(weightData);
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
    // The time out is just show loding phase
      if (!this.userData) {
        this.userInfoService.getUserData();
      }

      if (this.userData && !this.loadChartComponent) {
        this.loadChartComponent = true
      }

    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.isSidebarOpenSubcription.unsubscribe();
    this.userDataSubscription.unsubscribe();
    this.userData = null;
    this.userInfoService.clearUserData();
  }
}
