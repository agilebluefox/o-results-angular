import { Student } from '../models/student.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: string;
  students: Student[];
  active?: boolean;
}
