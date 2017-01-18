import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { Event } from '../models/event.model';
import { Student } from '../models/student.model';

interface APIResponse {
  message: string;
  data?: any;
}

@Injectable()
export class EventService {

  // Public property to hold events array
  private events: Event[] = [];

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

  /**
   * Methods for API calls to the server
   */

  // Method to get an event by id that contains unpopulated array fields
  getEventById(id: string): Observable<Event> {
    return this.http.get(`${this.eventsUrl}/${id}`)
      .map((res: Response) => {
        this.selectedEvent = res.json().data;
        return res.json().data;
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  getEvents(): Observable<Event[]> {
    return this.http.get(this.eventsUrl)
      .map((res: Response) => {
        this.events = res.json().data;
        return res.json().data;
      })
      .catch(this.handleError);
  }

  getSelectedEvent() {
    return this.selectedEvent;
  }

  // Method to handle errors from the Server
  // TODO: Provide the frontend with a reasonable message for the user
  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

  setSelectedEvent(event: Event) {
    this.selectedEvent = event;
  }

  /**
   * Methods to manage events
   */

  addEvent(event: Event): Observable<Event> {
    const body = JSON.stringify(event);

    let observable = this.http.post(this.eventsUrl, body, { headers: this.headers })
      .map((res: Response) => {
        this.selectedEvent = res.json().data;
        console.log(res.json().message);
        return res.json().data;
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));

    return observable;
  }

  deleteEvent(id: string): Observable<APIResponse> {
    const body = JSON.stringify({ id: id });
    return this.http.delete(this.eventsUrl, { headers: this.headers, body: body })
      .map((res: Response) => {
        this.events.splice(this.events.indexOf(res.json().data), 1);
        return res.json();
      })
      .catch((error: Response) => Observable.throw(error.json() || 'Server Error'));
  }

  // Modify the properties on an event
  updateEvent(event: Event): Observable<Event> {
    const body = JSON.stringify(event);
    return this.http.put(this.eventsUrl, body, { headers: this.headers })
      .map((res: Response) => res.json().data)
      .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
   * Methods to manage the student property on the selected event
   */

  // Add a student to the event
  addStudentToEvent(student: Student): void {
    console.log(`The student id to add to the event is: ${student._id}`);
    console.log(`Before the student is added: ${this.selectedEvent.students}`);
    let index = this.selectedEvent.students.findIndex((s) => {
      return s._id === student._id;
    });
    if (index !== -1) {
      return;
    }
    this.selectedEvent.students.push(student);
    console.log(`After the student is added: ${this.selectedEvent.students}`);
    let result = this.updateEvent(this.selectedEvent);
    result.subscribe(
      (data: any) => {
        console.log(`After the event is updated:`, data.success[0]);
        this.selectedEvent = data.success[0];
      }
    );
  }

  // Remove a student from the event
  removeStudentFromEvent(student: Student): Observable<Event> | void {
    console.log(`The student list before the removal is: ${this.selectedEvent.students}`);
     let index = this.selectedEvent.students.findIndex((s) => {
      return s._id === student._id;
    });
    if (index !== -1) {
      return;
    } else {
      console.log(`The index of the student id is: ${index}`);
      this.selectedEvent.students.splice(index, 1);
      return this.updateEvent(this.selectedEvent);
    }
  }

}
