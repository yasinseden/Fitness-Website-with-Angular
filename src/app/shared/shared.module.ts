import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageComponent } from './components/language/language.component';
import { CalculatorModalComponent } from './modals/calculator-modal/calculator-modal.component';
import { MaterialModule } from './material/material.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LanguageComponent,
    CalculatorModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    LanguageComponent,
    TranslateModule,
  ],
  providers: [
    TranslateService
  ]
})
export class SharedModule { }
