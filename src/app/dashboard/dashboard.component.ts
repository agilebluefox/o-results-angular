import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../events/shared/event.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // Public property to expose events array
  events: Event[];

  // Inject the services
  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  // Call getEvents to add the list when the page loads
  ngOnInit(): void {
    this.getEvents();
  }

  // Get the events
  getEvents(): void {
    // Resolves a promise from the EventService
    this.eventService.getEvents().then(events => { console.log(events); this.events = events });
  }

  goToDetails(event: Event): void {
    let link = ['/event-dashboard', event._id];
    this.router.navigate(link);
    // this.eventService.getEvent(id).then(event => console.log(event));
  }

  // Add an event
  addNewEvent(): void {
    // Navigate to the add form component
    this.router.navigate(['/event-add']);
  }

  deleteEvent(event: Event): void {
    this.eventService.deleteEvent(event._id)
      .subscribe(
        data => { 
          console.log(data);
          this.events.splice(this.events.indexOf(event),1);
        },
        error => console.log(error)
      );
  }

}
