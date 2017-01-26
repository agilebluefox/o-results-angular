import { Student } from './student.model';
import { Entry } from './entry.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: string;
  students: Student[];
  results: Entry[];
  active?: boolean;
}
