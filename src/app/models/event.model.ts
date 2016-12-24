import { Student } from './student.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: Date;
  students: Student[] | string;
  active?: boolean;
}
