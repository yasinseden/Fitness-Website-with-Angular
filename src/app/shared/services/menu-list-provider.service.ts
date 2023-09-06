import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuListProviderService {

  userMenu: string[] = ['profile', 'calculator', 'settings', 'logout']
}
