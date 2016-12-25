import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Event } from '../models/event.model';

interface APIResponse {
  message: string;
  data?: any;
}

@Injectable()
export class EventService {

  // Public property to hold events array
  private events: Event[] = [];

  // Property to hold the currently selected event
  private selectedEvent: Event;

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
      .map((res: Response) => this.events = res.json().data)
      .catch(this.handleError);
  }

  // Method to get an event by id that contains unpopulated array fields
  getEventById(id: string): Observable<Event> {
    return this.http.get(`${this.eventsUrl}/${id}`)
      .map((res: Response) => this.selectedEvent = res.json().data)
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  setSelectedEvent(event: Event) {
    this.selectedEvent = event;
  }

  addEvent(event: Event): Observable<Event> {
    const body = JSON.stringify(event);

    return this.http.post(this.eventsUrl, body, { headers: this.headers })
      .map((res: Response) => {
        this.selectedEvent = res.json().data;
        this.events.push(this.selectedEvent);
      } )
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  deleteEvent(id: string): void {
    const body = JSON.stringify({ id: id });
    let response: Observable<APIResponse> = this.http.delete(this.eventsUrl, { headers: this.headers, body: body })
      .map((res: Response) => res.json())
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));

   response.subscribe(
      (result: APIResponse) => {
        this.events.splice(this.events.indexOf(result.data), 1);
      },
      err => console.log(err),
      () => console.log('done')
    );
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
