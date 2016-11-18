import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Course } from '../courses/shared/course.model';

@Injectable()
export class CourseService {

  // Public property to hold courses array
  courses: Course[] = [];

  // Provide a url to the course data in the fake web api
  // private coursesUrl = 'app/shared/mock-courses.json';
  private coursesUrl = 'http://localhost:3000/courses';

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
  getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
      .toPromise()
      .then(response => response.json() as Course[])
      .catch(this.handleError);
  }

  addCourse(course: Course): Observable<Response> {
    const body = JSON.stringify(course);
    console.log(body);
    return this.http.post(this.coursesUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
