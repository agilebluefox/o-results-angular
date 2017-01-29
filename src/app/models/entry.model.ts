import { Student } from './student.model';

export class Entry {
    _id?: string;
    student: Student;
    cardNo: string;
    status: string;
    course: string;

    constructor (student) {
        this.student = student;
        this.cardNo = '';
        this.status = 'Registered';
        this.course = '';
    }
}
