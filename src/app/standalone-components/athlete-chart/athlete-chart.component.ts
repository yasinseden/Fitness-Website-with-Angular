import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { weightDataModel } from 'src/app/models/weight-data.model';
import { ComponentCommunicationService } from 'src/app/shared/services/component-communication.service';

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
  public userWeightLeanBodyMassDataArr: any[] = [];
  public userWeightFatPercentage: any[] = [];
  private userDataSubscription: Subscription;

  constructor(private userInfoService: UserInfoService, private langService: ComponentCommunicationService) {

    this.userDataSubscription = this.userInfoService.userDataObservable$.subscribe((data) => {
      this.userData = data;
      if (this.userData) {
        this.userWeightData = this.userData.bodyMeasurement.weight
      }
    })

    for (let i = 0; i < this.userWeightData.length; i++) {
      this.userWeightDateDataArr.push(this.userWeightData[i].dateData);
      this.userWeightDataWeightArr.push(this.userWeightData[i].weightData);
      this.userWeightLeanBodyMassDataArr.push(this.userWeightData[i].leanBodyMass)
      this.userWeightFatPercentage.push(this.userWeightData[i].fatPercentage)
    }
  }



  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [] = this.userWeightDateDataArr,
    datasets: [
      {
        data: [] = this.userWeightDataWeightArr,
        label: this.langService.setChartColoredLabels(0),
        fill: false,
        tension: 0.3,
        borderColor: 'red',
      },
      {
        data: [] = this.userWeightLeanBodyMassDataArr,
        label: this.langService.setChartColoredLabels(1),
        fill: false,
        tension: 0.3,
        borderColor: 'blue',
      },
      {
        data: [] = this.userWeightFatPercentage,
        label: this.langService.setChartColoredLabels(2),
        fill: false,
        tension: 0.3,
        borderColor: 'orange',
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 60,
        suggestedMax: 95
      }
    },
    aspectRatio: 2 | 2
  };
  public lineChartLegend = true;

  // BaseChartDirective allows me to make changes dynamically. NOTE: Learn more about BaseChartDirective
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() pushData(newWeightData: weightDataModel) {
    this.lineChartData.datasets[0].data.push(newWeightData.weightData);
    this.lineChartData.labels?.push(newWeightData.dateData)
    this.lineChartData.datasets[1].data.push(newWeightData.leanBodyMass)
    if (newWeightData.fatPercentage) {
      this.lineChartData.datasets[2].data.push(newWeightData.fatPercentage)
    }

    this.chart?.update();
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe()
  }
}
