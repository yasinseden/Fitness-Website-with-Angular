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
    trainerDetailArr = {
        showDetails: ['details-closed', 'fa-circle-chevron-down', 'hidden'],
        isExtended: false,
        expertise: '',
        description: {
            en: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores facere repudiandae quia accusamus porro nam officiis eum nulla modi, error fuga.Voluptates quam quidem esse hic, pariatur earum, accusamus ipsam necessitatibus sint blanditiis corporis praesentium?',
            tr: 'Fuga sit earum quidem hic esse, accusamus ipsam sint.'
        }
    }
    id: any;
}
