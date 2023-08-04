export class UserModel {
    firstName: string = '';
    lastName: string = '';
    userName: string = '';
    email: string = '';
    password: string = '';
    phoneNumber: string = '';
    role: string = '';
    birthYear: any | null = null;

    getAge(): any {
        const currentDate = new Date();
        const year = currentDate.getFullYear();

        if (this.birthYear !== null) {
            return year - this.birthYear;
        } else {
            return null;
        }
    }
}
