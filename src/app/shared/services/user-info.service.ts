import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

const CURRENT_USER_KEY = 'currentUserDataKey'

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private userDataBehavioralSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)
  public userDataObservable$ = this.userDataBehavioralSubject.asObservable();

  constructor() {
    const currentUserData: any = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserData) {
      const parsedUserData = JSON.parse(currentUserData)
      this.userDataBehavioralSubject.next(parsedUserData)
    }
  }

  setUserData(user: UserModel): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    this.userDataBehavioralSubject.next(user)
  }

  clearUserData(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    this.userDataBehavioralSubject.next(null)
  }
}
