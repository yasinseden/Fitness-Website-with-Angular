import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  selectedLang: string = 'en';

  changeSelectedLang(lang: string) {
    this.selectedLang = lang;
  }

}
