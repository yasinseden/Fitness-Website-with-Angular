import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from 'src/app/shared/services/component-communication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(public translateService: TranslateService,public langService: ComponentCommunicationService) {
    this.translateService.addLangs(['tr', 'en']);
    const selectedLang = this.langService.selectedLang;
    this.translateService.setDefaultLang(selectedLang);
  }

}
