import { Component } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent {

  displayClass: string = 'd-none'
  displaySituation: boolean = false

  displayClick() {
    if (!this.displaySituation) {
      this.displayClass = ''
      this.displaySituation = true
    } else {
      this.displayClass = 'd-none'
      this.displaySituation = false
    }
  }

}
