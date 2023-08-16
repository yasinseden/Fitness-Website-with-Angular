import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalculatorModalComponent } from 'src/app/shared/modals/calculator-modal/calculator-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuListProviderService } from 'src/app/shared/services/menu-list-provider.service';
import { UserHttpService } from 'src/app/shared/services/user-http.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {

  public userName: any;
  public userMenuList: string[] = []
  private userDataSubscription: Subscription;

  constructor(
    private menuListService: MenuListProviderService,
    private userInfoService: UserInfoService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.userMenuList = this.menuListService.userMenu

    this.userDataSubscription = this.userInfoService.userDataObservable$.subscribe((data) => {
      this.userName = data?.userName
    })
  }

  menuClick(menu: string) {
    switch (menu) {
      case 'profile':
        console.log('PROFİLE');
        break;
      case 'calculator':
        console.log('ADD INFO');

        const dialogRef = this.dialog.open(CalculatorModalComponent, {
          width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('IT WORKED', result);
        })
        break;
      case 'settings':
        console.log('SETTINGS');
        break;
      case 'logout':
        this.userInfoService.clearUserData();
        this.router.navigate(['/'])
        break;
      default:
        console.log('NO COMMAND RECEIVED');
        break;
    }
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
