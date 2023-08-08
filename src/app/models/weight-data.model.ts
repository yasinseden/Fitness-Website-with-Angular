export class weightDataModel {
    dateData: Date;
    weightData: number;

    constructor(weight: number) {
        const currentDate = new Date;
        this.dateData = currentDate;
        this.weightData = weight;
    }
}