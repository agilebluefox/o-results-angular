import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable, BehaviorSubject} from 'rxjs';

import { Event } from '../models/event.model';
import { Student } from '../models/student.model';
import { Entry } from '../models/entry.model';

@Injectable()
export class EventService {

  // Public property to hold events array
  private events: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  // Property to hold the currently selected event
  private selectedEvent: BehaviorSubject<Event> = new BehaviorSubject(null);

  // The url will be a JSON file for now
  // private eventsUrl = 'app/shared/mock-events.json';
  private eventsUrl = 'http://localhost:3000/events';

  // Setup http headers to send and receive JSON data
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) {
    this.loadEvents();
  }

  /**
   * Methods for API calls to the server
   */

  // Method to get an event by id that contains populated array fields
  getEventById(id: string): Observable<Event> {
    return this.http.get(`${this.eventsUrl}/${id}`)
      .map((res: Response) => {
        this.selectedEvent.next(res.json().data);
        return this.getSelectedEvent();
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  loadEvents() {
    this.http.get(this.eventsUrl)
      .subscribe((res: Response) => {
        let events = (<Object[]>res.json().data).map((ev: Event) => ev);
        this.events.next(events);
      },
      err => this.handleError);
  }

  getEvents(): Observable<Event[]> {
    return new Observable<Event[]>(fn => this.events.subscribe(fn));
  }

  getSelectedEvent() {
    return new Observable(fn => this.selectedEvent.subscribe(fn));
  }

  // Method to handle errors from the Server
  // TODO: Provide the frontend with a reasonable message for the user
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

  setSelectedEvent(event: Event) {
    this.selectedEvent.next(event);
  }

  /**
   * Methods to manage events
   */

  addEvent(event: Event): Observable<Event> {
    const body = JSON.stringify(event);

    let observable = this.http.post(this.eventsUrl, body, { headers: this.headers })
      .map((res: Response) => {
        this.selectedEvent.next(res.json().data);
        console.log(res.json().message);
        return this.getSelectedEvent();
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));

    return observable;
  }

  deleteEvent(id: string): Observable<Response> {
    const body = JSON.stringify({ id: id });
    return this.http.delete(this.eventsUrl, { headers: this.headers, body: body })
      .map((res: Response) => {
      let events = this.events.getValue();
        this.events.next(events.splice(events.indexOf(res.json().data), 1));
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  // Modify the properties on an event
  updateEvent(event: Event): Observable<Event> {
    console.log(`The event about to be updated is: `, event);
    const body = JSON.stringify(event);
    return this.http.put(this.eventsUrl, body, { headers: this.headers })
      .map((res: Response) => {
        this.selectedEvent.next(res.json().data);
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
   * Methods to manage the student property on the selected event
   */

  // Add a student to the event
  addStudentToEvent(student: Student): void {
    let event = this.selectedEvent.getValue();
    console.log(`The selected event:`);
    console.log(event);
    let index = event.results.findIndex((entry) => {
      return entry.student._id === student._id;
    });
    console.log(`The index of the student in the result property of the event is: ${index}`);
    // Check if the student is already registered in the event
    if (index !== -1) {
      return;
    }
    // Add the student to the event stored in the event service
    // then update the event in the database
    let entry = new Entry(student);
    event.results.push(entry);
    let res = this.updateEvent(event);
    res.subscribe(
      (result: any) => {
        this.selectedEvent.next(result);
      }
    );
  }

  // Remove a student from the event
  removeStudentFromEvent(student: Student): void {
    let event = this.selectedEvent.getValue();
    let index = event.results.findIndex((entry) => {
      return entry.student._id === student._id;
    });
    // Check to confirm the student is registered in the event
    console.log(`The index of the student id is: ${index}`);
    if (index === -1) { return; }
    console.log(`The index of the student id is: ${index}`);
    event.results.splice(index, 1);
    let res = this.updateEvent(event);
    res.subscribe(
      (e: Event) => {
        console.log(`After the event is updated:`, e);
        this.selectedEvent.next(e);
      }
    );
  }

  updateResultOnEvent(result) {
    let event = this.selectedEvent.getValue();
    let index = event.results.findIndex((entry) => {
      return entry._id === result._id;
    });
    event.results.splice(index, 1, result);
    let res = this.updateEvent(event);
    res.subscribe(
      (e: Event) => {
        console.log(`After the event is updated:`, e);
        this.selectedEvent.next(e);
      }
    );
  }

}
