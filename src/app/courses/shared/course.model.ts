import { Control } from '../../controls/shared/control.model';

export class Course {
    _id: string;
    location: string;
    name: string;
    codename: string;
    mapdate: string;
    type: string;
    inorder: boolean;
    controls: Control[];
    active: boolean;
}