import { BodyMeasurementsModel } from "./body-measurements.model";
import { ExerciseModel } from "./exercise.model";

export class UserModel {
    firstName: string = '';
    lastName: string = '';
    userName: string = '';
    email: string = '';
    password: string = '';
    phoneNumber: string = '';
    role: string = '';
    gender: string | undefined;
    birthYear: any | null = null;
    profilePic: string = '';
    exercises: ExerciseModel[] = [];
    bodyMeasurement: BodyMeasurementsModel = new BodyMeasurementsModel;
    id: any;
}
