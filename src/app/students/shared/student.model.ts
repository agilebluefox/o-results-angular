import { Cls } from '../../classes/shared/cls.model';

export class Student {
    _id: string;
    unityid: string;
    email: string;
    firstname: string;
    lastname: string;
    sex: number;
    cls?: Cls[];
}