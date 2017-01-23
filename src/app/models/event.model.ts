import { Student } from './student.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: string;
  students: Student[];
  active?: boolean;
}
