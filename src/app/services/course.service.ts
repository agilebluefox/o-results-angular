import { Injectable } from '@angular/core';

import { Course } from '../courses/shared/course';
import { COURSES } from '../shared/mock-courses';

@Injectable()
export class CourseService {
  courses: Course[] = [];
  course: Course;

  constructor() { }

  getCourses(): Promise<Course[]> {
    return Promise.resolve(COURSES);
  }

}
