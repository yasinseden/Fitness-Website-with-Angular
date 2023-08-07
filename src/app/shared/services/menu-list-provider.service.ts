import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuListProviderService {

  athleteMenu: string[] = ['MENU 1', 'MENU 2', 'MENU 3', 'MENU 4', 'MENU 5', 'MENU 6', 'MENU 7']
  trainerMenu: string[] = ['MENU 1', 'MENU 2', 'MENU 3', 'MENU 4', 'MENU 5', 'MENU 6', 'MENU 7', 'MENU 8', 'MENU 9', 'MENU 10', 'MENU 11', 'MENU 12']

  userMenu: string[] = ['Profile', 'Add Info', 'Settings', 'Log Out']
}
