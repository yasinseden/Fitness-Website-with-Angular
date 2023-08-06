import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, UrlSegment } from '@angular/router';
import { MenuListProviderService } from 'src/app/shared/services/menu-list-provider.service';
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
    private menuList: MenuListProviderService,
    private sidebarUserMediator: SidebarUserMediatorService
  ) { }

  ngOnInit(): void {
    const routeUrl = (this.route.snapshot.children[0].url[0].path);

    if (routeUrl === 'trainer') {
      this.sidebarArr = this.menuList.trainerMenu
    } else {
      this.sidebarArr = this.menuList.athleteMenu
    }
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
