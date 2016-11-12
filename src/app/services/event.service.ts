import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from '../events/shared/event';

@Injectable()
export class EventService {

  // The url will be a JSON file for now
  private eventsUrl = 'app/shared/mock-events.json';

  // Setup http headers
  private headers = new Headers({ 'Content-Type': 'application/json' });

  // Handle error if the http request fails
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  // Get the events and return a promise
  getEvents(): Promise<Event[]> {
    return this.http.get(this.eventsUrl)
      .toPromise()
      .then(response => response.json().data as Event[])
      .catch(this.handleError);
  }

  // Method to get an event by id
  getEvent(id: string): Promise<Event> {
    return this.getEvents().then(events => events.find(event => event._id === id));
  }

}
