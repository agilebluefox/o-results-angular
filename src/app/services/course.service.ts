import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Course } from '../courses/shared/course';

@Injectable()
export class CourseService {
    
    // Provide a url to the course data in the fake web api
 private coursesUrl = 'app/shared/mock-courses.json';

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
  getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
      .toPromise()
      .then(response => response.json().data as Course[])
      .catch(this.handleError);
  }

}
