import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public calcBodyFatPercentage(waist: number, neck: number, height: number) {
    const calcBodyFatPercentage = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
    return calcBodyFatPercentage;
}
}
