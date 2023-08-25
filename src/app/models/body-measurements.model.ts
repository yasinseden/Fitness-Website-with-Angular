import { weightDataModel } from "./weight-data.model";

export class BodyMeasurementsModel {
    weight: weightDataModel[] = [];
    height: number = 0;
    targetWeight: number = 0;
    neck: number = 0;
    waist: number = 0;
    hips: number = 0;
}