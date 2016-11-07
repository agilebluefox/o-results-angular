import { Injectable } from '@angular/core';

import { Student } from '../students/shared/student';
import { STUDENTS } from '../shared/mock-students';

@Injectable()
export class StudentService {
  students: Student[] = [];
  student: Student;

  constructor() { }

  getStudents(): Promise<Student[]> {
    return Promise.resolve(STUDENTS);
  }

}
