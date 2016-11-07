import { Injectable } from '@angular/core';

<<<<<<< HEAD
import { Course } from '../courses/shared/course';
import { COURSES } from '../shared/mock-courses';

@Injectable()
export class CourseService {
  courses: Course[] = [];
  course: Course;

  constructor() { }

  getCourses(): Promise<Course[]> {
    return Promise.resolve(COURSES);
=======
import { Class } from '../classes/shared/class';
import { CLASSES } from '../shared/mock-classes';

@Injectable()
export class CourseService {

  constructor() { }

  getClasses(): Promise<Class[]> {
    return Promise.resolve(CLASSES);
>>>>>>> e0f61f4... Add service to provide course data
  }

}
