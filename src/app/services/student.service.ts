import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Student } from '../students/shared/student.model';

@Injectable()
export class StudentService {
 
 // Provide a url to the student data in the fake web api
 private studentsUrl = 'app/shared/mock-students.json';

 // Setup http headers
 private headers = new Headers({ 'Content-Type': 'application/json' });

  // Method to handle errors if the http request fails
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Inject the Http Module
  constructor(private http: Http) { }

  // Get students and return a promise
  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentsUrl)
      .toPromise()
      .then(response => response.json() as Student[])
      .catch(this.handleError);
  }

}
