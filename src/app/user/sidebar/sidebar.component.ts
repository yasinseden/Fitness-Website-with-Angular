import { Component } from '@angular/core';
import { ActivatedRoute, RouterState, UrlSegment } from '@angular/router';
import { MenuListProviderService } from 'src/app/shared/services/menu-list-provider.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isTrainerRoute: boolean = false;
  sidebarArr: string[] = [];


  constructor(private route: ActivatedRoute, private menuList: MenuListProviderService) {}

  ngOnInit(): void {
    const routeUrl = (this.route.snapshot.children[0].url[0].path);

    if (routeUrl === 'trainer') {
      this.sidebarArr = this.menuList.trainerMenu
    } else {
      this.sidebarArr = this.menuList.athleteMenu
    }
  }
}
