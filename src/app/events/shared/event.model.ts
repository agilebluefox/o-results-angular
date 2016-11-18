import { Cls } from '../../classes/shared/cls.model';
import { Course } from '../../courses/shared/course.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: string;
  classes?: Cls[];
  courses?: Course[];
  active?: boolean;
}