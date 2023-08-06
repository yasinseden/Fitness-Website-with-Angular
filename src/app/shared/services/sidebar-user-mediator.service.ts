import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarUserMediatorService {

  private isSidebarOpenSubject = new Subject<boolean>();

  sidebarStatus$ = this.isSidebarOpenSubject.asObservable();

  emitSidebarStatusEvent(value: boolean) {
    this.isSidebarOpenSubject.next(value)
  }

}
