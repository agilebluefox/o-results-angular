import { Class } from '../../classes/shared/class';
import { Course } from '../../courses/shared/course';

export class Event {
  _id: string;
  name: string;
  location: string;
  date: string;
  classes: Class[];
  courses: Course[];
  active: boolean;
}