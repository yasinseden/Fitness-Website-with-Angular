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

  class: string = 'trainer-detail'

  toggleClass() {
    this.class = this.class === 'trainer-detail' ? 'open-details' : 'trainer-detail';
    console.log(this.class);
     
  }
}
