import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ComponentCommunicationService } from 'src/app/shared/services/component-communication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.css']
})
export class TrainersListComponent {

  public trainerDetailClass: string = 'details-closed'
  public arrowIconStatus: string = 'fa-circle-chevron-down'
  public trainers: UserModel[] = [];
  public currentLang: string;

  datePickingForm = new FormGroup({
    currentDate: new FormControl('')
  })

  constructor(private http: HttpClient, private langService: ComponentCommunicationService) {
    // I think this is not a good way to get data. If you find or learn better way don't forget to change this snippet
    this.http.get<any>("http://localhost:3000/users").subscribe(users => {
      this.trainers = users.filter((user: { role: string; }) => user.role === 'admin')
    })

    this.currentLang = langService.selectedLang
  }

  // The code below controls the display of trainer's field according to the object class field
  toggleClass(trainer: UserModel) {
    // There is something weird in following cod spippet into method. On first click the isExtended field doesn't change. The weird thing is that when I change the default value of isExtended and condition in this method to true code doesn's run same. The code works like this but it's none sense
    trainer.trainerDetailArr.isExtended = !trainer.trainerDetailArr.isExtended
    trainer.trainerDetailArr.showDetails[0] = trainer.trainerDetailArr.isExtended === false ? 'details-opened' : 'details-closed';
    trainer.trainerDetailArr.showDetails[1] = trainer.trainerDetailArr.isExtended === false ? 'fa-circle-chevron-up' : 'fa-circle-chevron-down'
    if (trainer.trainerDetailArr.showDetails[2] === 'hidden') {
      trainer.trainerDetailArr.showDetails[2] = 'shown'
    } else {
      setTimeout(() => {
        trainer.trainerDetailArr.showDetails[2] = 'hidden'
      }, 500);
    }
  }

  getAvailableDates() {
    const formValue = this.datePickingForm.value
    const date = formValue.currentDate
  }
}
