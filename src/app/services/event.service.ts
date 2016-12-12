import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Event } from '../events/shared/event.model';

@Injectable()
export class EventService {

  // Public property to hold events array
  events: Event[] = [];

  // Property to hold the currently selected event
  selectedEvent: Event;

  // The url will be a JSON file for now
  // private eventsUrl = 'app/shared/mock-events.json';
  private eventsUrl = 'http://localhost:3000/events';

  // Setup http headers to send and receive JSON data
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) { }

  getEvents(): Observable<Event[]> {
    return this.http.get(this.eventsUrl)
      .map((res: Response) => this.events = res.json().events)
      .catch(this.handleError);
  }

  // Method to get an event by id that contains unpopulated array fields
  getEvent(id: string): Event {
    this.selectedEvent = this.events.find((event) => event._id === id);
    return this.selectedEvent;
  }

  // Return the currently selected event
  getSelectedEvent(): Event {
    return this.selectedEvent;
  }

  // Method to get an event by id with the MongoId fields populated
  getPopulatedEvent(id: string): Observable<any> {
    let populate = true;
    let active = true;
    return this.http.get(`${this.eventsUrl}/populate/${populate}/active/${active}`)
      .map((response: Response) => response.json())
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
    let eventsToUpdate = [];
    eventsToUpdate.push(event);
    const body = JSON.stringify(eventsToUpdate);
    return this.http.put(this.eventsUrl, body, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  // Method to handle errors from the Server
  // TODO: Provide the frontend with a reasonable message for the user
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

}
