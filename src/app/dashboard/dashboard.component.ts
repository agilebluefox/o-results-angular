import { Component, OnInit, Input } from '@angular/core';
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
  @Input() events: Event[];

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
    let populate = false;
    let active = true;
    this.eventService.getEvents((events) => { this.events = events }, populate, active);
  }

  goToDetails(id: string): void {
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

  deleteEvent(event: Event): void {
    this.eventService.deleteEvent(event._id)
      .subscribe(
      data => {
        console.log(data);
        this.events.splice(this.events.indexOf(event), 1);
      },
      error => console.log(error)
      );
  }

  editEvent(event: Event): void {
    // Navigate to the add component
    let link = ['/event-add', event._id];
    this.router.navigate(link);
  }

}
