import { Cls } from '../../classes/shared/cls.model';
import { Course } from '../../courses/shared/course.model';
import { Student } from '../../students/shared/student.model';

export class Event {
  _id?: string;
  name: string;
  location: string;
  date: string;
  classes?: Cls[];
  courses?: Course[];
  students?: string[];
  active?: boolean;
}