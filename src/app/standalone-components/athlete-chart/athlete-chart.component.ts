import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-athlete-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './athlete-chart.component.html',
  styleUrls: ['./athlete-chart.component.css']
})
export class AthleteChartComponent {

  public userData: UserModel | null = null;
  public userWeightData: any[] = [];
  public userWeightDataWeightArr: any[] = [];
  public userWeightDateDataArr: any[] = [];
  private userDataSubscription: Subscription;

  constructor(private userInfoService: UserInfoService, private cdRef: ChangeDetectorRef) {

    this.userDataSubscription = this.userInfoService.userDataObservable$.subscribe((data) => {
      this.userData = data;
      if (this.userData) {
        this.userWeightData = this.userData.bodyMeasurement.weight
      }
    })

    for (let i = 0; i < this.userWeightData.length; i++) {
      this.userWeightDateDataArr.push(this.userWeightData[i].dateData);
      this.userWeightDataWeightArr.push(this.userWeightData[i].weightData);
    }

    console.log(this.userWeightDataWeightArr);
    console.log(this.userWeightData);

    // if (!this.userData) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 500)
    // }
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [] = this.userWeightDateDataArr,
    datasets: [
      {
        data: [] = this.userWeightDataWeightArr,
        label: 'Weight Data',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 80,
        suggestedMax: 95
      }
    }
  };
  public lineChartLegend = true;

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe()
  }
}
