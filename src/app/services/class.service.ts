import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Cls } from '../classes/shared/cls.model';

@Injectable()
export class ClassService {

  // Public property to hold classes array
  classes: Cls[] = [];

  // Provide a url to the class data in the fake web api
  //  private classesUrl = 'app/shared/mock-classes.json';
  private classesUrl = 'http://localhost:3000/classes';

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

  // Get classes and return a promise
  getClasses(): Promise<Cls[]> {
    if (this.classes.length) {
      return Promise.resolve(this.classes);
    } else {
      return this.http.get(this.classesUrl, { headers: this.headers })
        .toPromise()
        .then(response => response.json() as Cls[])
        .catch(this.handleError);
    }
  }

  // Method to add a new class
  addClass(cls: Cls): Observable<Response> {
    const body = JSON.stringify(cls);
    console.log(body);
    return this.http.post(this.classesUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
