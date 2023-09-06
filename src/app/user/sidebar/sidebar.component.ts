import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SidebarUserMediatorService } from 'src/app/shared/services/sidebar-user-mediator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isTrainerRoute: boolean = false;
  sidebarArr: string[] = [];
  isSidebarOpen: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private sidebarUserMediator: SidebarUserMediatorService,
    public translateService: TranslateService
  ) {
    const routeUrl = (this.route.snapshot.children[0].url[0].path);

    this.translateService.get('sidebarMenuField').subscribe(data => {
     this.sidebarArr = routeUrl === 'trainer' ? data.trainerMenu : data.athleteMenu;
     console.log(data);
     
    })
  }

  toggleSidebarStatus() {

    if (this.isSidebarOpen) {
      this.isSidebarOpen = false
    } else {
      this.isSidebarOpen = true
    }
    this.sidebarUserMediator.emitSidebarStatusEvent(this.isSidebarOpen)
    console.log(this.isSidebarOpen);
  }
}
