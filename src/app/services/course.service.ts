import { Injectable } from '@angular/core';

<<<<<<< HEAD
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
=======
import { Course } from '../courses/shared/course';
import { COURSES } from '../shared/mock-courses';
>>>>>>> 838813c... Setup services for data models

@Injectable()
export class CourseService {
  courses: Course[] = [];
  course: Course;

  constructor() { }

<<<<<<< HEAD
  getClasses(): Promise<Class[]> {
    return Promise.resolve(CLASSES);
>>>>>>> e0f61f4... Add service to provide course data
=======
  getCourses(): Promise<Course[]> {
    return Promise.resolve(COURSES);
>>>>>>> 838813c... Setup services for data models
  }

}
