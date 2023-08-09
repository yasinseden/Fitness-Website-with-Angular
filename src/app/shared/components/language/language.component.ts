import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCommunicationService } from '../../services/component-communication.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  constructor(private translate: TranslateService, public langService: ComponentCommunicationService) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.langService.changeSelectedLang(lang);
  }

}
