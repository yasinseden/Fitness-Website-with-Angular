import { Component } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent {

  displayClass: string = 'd-none'
  displayStiation: boolean = false

  displayClick() {
    if (!this.displayStiation) {
      this.displayClass = ''
      this.displayStiation = true
    } else {
      this.displayClass = 'd-none'
      this.displayStiation = false
    }
  }

}
