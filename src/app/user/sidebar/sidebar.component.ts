import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from 'src/app/shared/services/component-communication.service';
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
    public translateService: TranslateService,
    public componentCommunicationService: ComponentCommunicationService
  ) {
    const routeUrl = (this.route.snapshot.children[0].url[0].path);

    this.translateService.get('sidebarMenuField').subscribe(data => {
     this.sidebarArr = routeUrl === 'trainer' ? data.trainerMenu : data.athleteMenu;
    })
  }

  // This method emits the string value of menuName to control the component to be rendered
  whichContentWillBeRendered(menuName: string) {
    this.componentCommunicationService.componentToBeRenderedBehaviorSubject.next(menuName)
  }

  // This field is for to control sidebar status (open/close) and make differences according to sidebar status like compress the screen
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
