import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from 'src/app/shared/services/component-communication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public translateService: TranslateService,public langService: ComponentCommunicationService) {
    this.translateService.addLangs(['tr', 'en']);
    const selectedLang = this.langService.selectedLang;
    this.translateService.setDefaultLang(selectedLang);
  }
}
