import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../events/shared/event.model';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';

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
  }

  // Get the events
  getEvents(): Observable<Event[]> {
    return this.eventService.getEvents();
  }

  // Store the mongo id of the event selected by the user
  selectEvent(id: string): void {
    this.eventService.setSelectedEventId(id);
    let link = ['/event-dashboard', id];
    this.router.navigate(link);
    // this.eventService.getEvent(id).then(event => console.log(event));
  }

  // Add an event
  addNewEvent(): void {
    let link = ['/event-add'];
    // Navigate to the add form component
    this.router.navigate(link);
  }

  // deleteEvent(event: Event): void {
  //   this.eventService.deleteEvent(event._id)
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       this.events.splice(this.events.indexOf(event), 1);
  //     },
  //     error => console.log(error)
  //     );
  // }

  editEvent(id: string): void {
    // Navigate to the add component
    let link = ['/event-add', id];
    this.router.navigate(link);
  }

}
