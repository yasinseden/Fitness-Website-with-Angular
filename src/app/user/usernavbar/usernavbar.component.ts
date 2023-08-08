import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuListProviderService } from 'src/app/shared/services/menu-list-provider.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {

  userName: any;
  userMenuList: string[] = []

  constructor(
    private auth: AuthService,
    private menuListService: MenuListProviderService,
    private http: UserHttpService
  ) {
    this.userMenuList = this.menuListService.userMenu

    const userEmail = this.auth.getEmail();
    const userPassword = this.auth.getPassword();

    this.http.getUserByEmailAndPassword(userEmail, userPassword).subscribe((data) => {
      this.userName = data[0].userName
    })
  }

}
