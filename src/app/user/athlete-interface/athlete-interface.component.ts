import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';

@Component({
  selector: 'app-athlete-interface',
  templateUrl: './athlete-interface.component.html',
  styleUrls: ['./athlete-interface.component.css']
})
export class AthleteInterfaceComponent {

  public columnClass: string = 'col-12'
  private isSidebarOpenSubcription: Subscription;

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

  ngOnDestroy(): void {
    this.isSidebarOpenSubcription.unsubscribe();
  }
}
