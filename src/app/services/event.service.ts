import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs';

import { Event } from '../events/shared/event.model';

@Injectable()
export class EventService {

  // Public property to hold events array
  events: Event[] = [];

  // Property to hold the currently selected event
  event: Event;

  // The url will be a JSON file for now
  // private eventsUrl = 'app/shared/mock-events.json';
  private eventsUrl = 'http://localhost:3000/events';

  // Setup http headers to send and receive JSON data
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) { }

  // Get the active events and return an Observable
  getEvents(populate?: boolean, active?: boolean): Observable<any> {
    return this.http.get(`${this.eventsUrl}/populate/${populate}/active/${active}`)
      .map((res: Response) => res.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Method to get an event by id that contains unpopulated array fields
  getEvent(id: string): Observable<Response> {
    let populate = false;
    let active = true;
    return this.http.get(`${this.eventsUrl}/populate/${populate}/active/${active}`)
      .map((response: Response) => response.json())
      .filter((event) => event._id === id)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Method to get an event by id with the MongoId fields populated
  getPopulatedEvent(id: string): Observable<Response> {
    let populate = true;
    let active = true;
   return this.http.get(`${this.eventsUrl}/populate/${populate}/active/${active}`)
      .map((response: Response) => response.json())
      .filter((event) => event._id === id)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addEvent(event: Event): Observable<Response> {
    const body = JSON.stringify(event);
    console.log(body);
    return this.http.post(this.eventsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteEvent(id: string): Observable<Response> {
    const body = JSON.stringify({ id: id });
    return this.http.delete(this.eventsUrl, { headers: this.headers, body: body })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateEvent(event: Event): Observable<Response> {
    const body = JSON.stringify(event);
    return this.http.put(this.eventsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
