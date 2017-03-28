import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../models/event.model';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // Public property to expose events array
  events: Observable<Event[]>;

  // Inject the services
  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  // Call getEvents to add the list when the page loads
  ngOnInit(): void {
     this.events = this.getEvents();
     console.log(this.events);
  }

  // Get the events
  getEvents(): Observable<Event[]> {
    return this.eventService.getEvents();
  }

  // Store the mongo id of the event selected by the user
  selectEvent(event: Event): void {
    this.eventService.setSelectedEvent(event);
    let link = ['/event-dashboard'];
    this.router.navigate(link);
  }

  // Add an event
  addNewEvent(): void {
    //this.eventService.setSelectedEvent(null);
    let link = ['/event-add'];
    // Navigate to the add form component
    this.router.navigate(link);
  }

   editEvent(event: Event): void {
         this.eventService.setSelectedEvent(event);
      // Navigate to the add component
      let link = ['/event-add'];
      this.router.navigate(link);
    }

  deleteEvent(id: string) {
    let deletedEvent = this.eventService.deleteEvent(id);
    deletedEvent.subscribe(
      (result) => {
        console.log(result);
        this.events = this.getEvents();
      },
      error => console.log(error)
    );

  }

}
