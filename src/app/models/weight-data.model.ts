import { UserModel } from "./user.model";

export class weightDataModel {
    dateData: string;
    weightData: number;
    leanBodyMass: number | null;
    fatPercentage: number | null | undefined;

    constructor(weight: number, userModel1: UserModel, userModel2: UserModel) {

        this.weightData = weight;

        const currentDate = new Date;
        const currentDay = currentDate.getDate().toString().padStart(2, '0')
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const currentYear = currentDate.getFullYear()
        this.dateData = `${currentYear}-${currentMonth}-${currentDay}`

        if ((userModel1.gender !== undefined ? userModel1.gender : userModel2.gender) === 'true') {
            const maleFatPercentage = 86.01 * Math.log10((userModel1.bodyMeasurement.waist !== 0 ? userModel1.bodyMeasurement.waist : userModel2.bodyMeasurement.waist)  - (userModel1.bodyMeasurement.neck !== 0 ? userModel1.bodyMeasurement.neck : userModel2.bodyMeasurement.neck)) - 70.041 * Math.log10(userModel1.bodyMeasurement.height !== 0 ? userModel1.bodyMeasurement.height : userModel2.bodyMeasurement.height) + 36.76
            
            const stringFatPercentage = maleFatPercentage.toFixed(2)
            this.fatPercentage = parseFloat(stringFatPercentage)
            
            const stringLeanBodyWeight = (weight - (weight * (maleFatPercentage / 100))).toFixed(2)
            this.leanBodyMass = parseFloat(stringLeanBodyWeight)
            
        } else if((userModel1.gender !== undefined ? userModel1.gender : userModel2.gender) === 'false') {
            const femaleFatPercentage = 163.205 * Math.log10((userModel1.bodyMeasurement.waist !== 0 ? userModel1.bodyMeasurement.waist : userModel2.bodyMeasurement.waist) + (userModel1.bodyMeasurement.hips !== 0 ? userModel1.bodyMeasurement.hips : userModel2.bodyMeasurement.hips) - (userModel1.bodyMeasurement.neck !== 0 ? userModel1.bodyMeasurement.neck : userModel2.bodyMeasurement.neck)) - 97.684 * Math.log10(userModel1.bodyMeasurement.height !== 0 ? userModel1.bodyMeasurement.height : userModel2.bodyMeasurement.height) - 78.387
           
            const stringFatPercentage = femaleFatPercentage.toFixed(2)
            this.fatPercentage = parseFloat(stringFatPercentage);
           
            const stringLeanBodyWeight = (weight - (weight * (femaleFatPercentage / 100))).toFixed(2)
            this.leanBodyMass = parseFloat(stringLeanBodyWeight)
        } else {
            this.leanBodyMass = null;
        }
    }
}