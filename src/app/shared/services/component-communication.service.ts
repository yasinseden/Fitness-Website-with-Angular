import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  // To control selected language
  selectedLang: string = 'en';

  changeSelectedLang(lang: string) {
    this.selectedLang = lang;
  }

  // To change Athlete Chart's colored (line) labels
  enLabels: string[] = ["Total Body Mass (KG)", "Lean Body Mass (KG)", "Fat Percentage (%)"]
  trLabels: string[] = ["Toplam Vücut Ağırlığı (KG)", "Yağsız Vücut Ağırlığı (KG)", "Yağ Yüzdesi (%)"]
  // With this method the colored (line) labels are assigned according to selected language. It's not looking professional when you turn back to these codes try to find a better way.
  setChartColoredLabels(index: number): string {
    return this.selectedLang === 'en' ? this.enLabels[index] : this.trLabels[index];
  }
}
