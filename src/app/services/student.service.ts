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

  // Method to handle errors from the Server
  // TODO: Provide the frontend with a reasonable message for the user
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

  // Inject the Http Module
  constructor(private http: Http) { }

  // Get students and return an observable
  getStudents(): Observable<Student[]> {
      return this.http.get(this.studentsUrl)
        .map((res: Response) => {
          this.students = res.json().data;
          console.log(this.students);
          return res.json().data;
        })
        .catch(this.handleError);
    }

  getStudentById(id: string): Observable<Student> {
    return this.http.get(`${this.studentsUrl}/${id}`)
      .map((res: Response) => res.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addStudent(student: Student): Observable<Student> {
    const body = JSON.stringify(student);
    console.log(body);
    return this.http.post(this.studentsUrl, body, { headers: this.headers })
      .map((res: Response) => res.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateStudent(student: Student): Observable<Student[]> {
    let studentsToUpdate = [];
    studentsToUpdate.push(student);
    const body = JSON.stringify(studentsToUpdate);
    return this.http.put(this.studentsUrl, body, { headers: this.headers })
      .map((res: Response) => res.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteStudent(id: string) {
    const body = JSON.stringify({ id: id });
    return this.http.delete(this.studentsUrl, { headers: this.headers, body: body })
      .map((res: Response) => res.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
