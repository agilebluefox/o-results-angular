import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Class } from '../classes/shared/class';

@Injectable()
export class ClassService {
  // Provide a url to the class data in the fake web api
 private classesUrl = 'app/shared/mock-classes.json';

 // Setup http headers
 private headers = new Headers({ 'Content-Type': 'application/json' });

  // Method to handle errors if the http request fails
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Inject the Http Module
  constructor(private http: Http) { }

  // Get classes and return a promise
  getClasses(): Promise<Class[]> {
    return this.http.get(this.classesUrl)
      .toPromise()
      .then(response => response.json().data as Class[])
      .catch(this.handleError);
  }

}
