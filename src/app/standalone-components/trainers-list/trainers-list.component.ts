import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.css']
})
export class TrainersListComponent {

  public trainerDetailClass: string = 'details-closed'
  public arrowIconStatus: string = 'fa-circle-chevron-down'
  public displayDetailContent: boolean = false;
  public items = [
    {
      key: 1,
      class: ['details-closed', 'fa-circle-chevron-down', 'hidden']
    },
    {
      key: 2,
      class: ['details-closed', 'fa-circle-chevron-down', 'hidden']
    },
    {
      key: 3,
      class: ['details-closed', 'fa-circle-chevron-down', 'hidden']
    },
    {
      key: 4,
      class: ['details-closed', 'fa-circle-chevron-down', 'hidden']
    }
  ]

  // The code below controls the display of trainer's field according to the object class field
  toggleClass(item: any) {
    item.isExtended = !item.isExtended
    item.class[0] = item.isExtended === true ? 'details-opened' : 'details-closed';
    item.class[1] = item.isExtended === true ? 'fa-circle-chevron-up' : 'fa-circle-chevron-down'
    if (item.class[2] === 'hidden') {
      item.class[2] = 'shown'
    } else {
      setTimeout(() => {
        item.class[2] = 'hidden'
      }, 500);
    }
  }
}
