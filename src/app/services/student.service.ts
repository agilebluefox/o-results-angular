import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Student } from '../models/student.model';

@Injectable()
export class StudentService {

  // Public property to hold students array
  private students: Student[] = [];

  // Provide a url to the student data in the fake web api
  // private studentsUrl = 'app/shared/mock-students.json';
  private studentsUrl = 'http://localhost:3000/students';

  // Setup http headers
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Method to handle errors if the http request fails
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Inject the Http Module
  constructor(private http: Http) { }

  // Get students and return a promise
  getStudents(): Promise<Student[]> {
    if (this.students.length) {
      return Promise.resolve(this.students);
    } else {
      return this.http.get(this.studentsUrl)
        .toPromise()
        .then(response => response.json() as Student[])
        .catch(this.handleError);
    }
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.studentsUrl}/${id}`)
      .map((response: Response) => response.json().data)
      .map((response: any) => response.student)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addStudent(student: Student): Observable<Student> {
    const body = JSON.stringify(student);
    console.log(body);
    return this.http.post(this.studentsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

   updateStudent(student: Student): Observable<Student[]> {
    let studentsToUpdate = [];
    studentsToUpdate.push(student);
    const body = JSON.stringify(studentsToUpdate);
    return this.http.put(this.studentsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
