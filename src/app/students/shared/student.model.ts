import { Class } from '../../classes/shared/class';

export class Student {
    _id: string;
    unityid: string;
    email: string;
    firstname: string;
    lastname: string;
    sex: number;
    class: Class[];
}