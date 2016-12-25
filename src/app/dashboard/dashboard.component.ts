import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../models/event.model';
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
  selectEvent(event: Event): void {
    this.eventService.setSelectedEvent(event);
    let link = ['/event-dashboard', event._id];
    this.router.navigate(link);
  }

  // Add an event
  addNewEvent(): void {
    let link = ['/event-add'];
    // Navigate to the add form component
    this.router.navigate(link);
  }

  deleteEvent(event: Event): void {
    let id = event._id;
    this.eventService.deleteEvent(id);
  }

  editEvent(event: Event): void {
    // Navigate to the add component
    let id = event._id;
    let link = ['/event-add', id];
    this.router.navigate(link);
  }

}
