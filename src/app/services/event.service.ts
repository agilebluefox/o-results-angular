import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Event } from '../events/shared/event.model';

@Injectable()
export class EventService {

  // Public property to hold events array
  events: Event[] = [];

  // The url will be a JSON file for now
  // private eventsUrl = 'app/shared/mock-events.json';
  private eventsUrl = 'http://localhost:3000/events';

  // Setup http headers to send and receive JSON data
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Handle error if the http request fails
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  // Get the events and return a promise
  getEvents(): Promise<Event[]> {
    if (this.events.length) {
      return Promise.resolve(this.events);
    } else {
      return this.http.get(this.eventsUrl, { headers: this.headers })
        .toPromise()
        .then(response => response.json() as Event[])
        .catch(this.handleError);
    }
  }

  // Method to get an event by id
  getEvent(id: string): Promise<Event> {
    return this.getEvents().then(events => events.find(event => event._id === id));
  }

  addEvent(event: Event): Observable<Response> {
    const body = JSON.stringify(event);
    console.log(body);
    return this.http.post(this.eventsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
