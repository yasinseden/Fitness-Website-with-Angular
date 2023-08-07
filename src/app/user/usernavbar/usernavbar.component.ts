import { Component } from '@angular/core';
import { MenuListProviderService } from 'src/app/shared/services/menu-list-provider.service';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {

  userMenuList: string[] = []

  constructor(private menuListService: MenuListProviderService) {
    this.userMenuList = this.menuListService.userMenu 
  }

}
