import { weightDataModel } from "./weight-data.model";

export class BodyMeasurementsModel {
    weight: weightDataModel[] = [];
    height: string = '';
    targetWeight: string = '';
    neck: string = '';
    waist: string = '';
    hips: string = '';
}