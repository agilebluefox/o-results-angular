import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../events/shared/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [EventService]
})

export class DashboardComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;

/**
 * Creates an instance of DashboardComponent.
 * 
 * @param {Router} router
 * @param {EventService} EventService
 * 
 * @memberOf DashboardComponent
 */
  constructor(
    private router: Router,
    private EventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Get the events.
   */
  getEvents(): void {
    // Resolves a promise from the EventService
    this.EventService.getEvents().then(events => this.events = events);
  }

  onSelect(event: Event): void {
    console.log(event.name);
    this.selectedEvent = event;
    this.router.navigate(['/event-details', this.selectedEvent.id]);
  }
/**
 * Add a new event
 */
  addNewEvent(): void {
    // Navigate to the add form component
    this.router.navigate(['/event-add']);
  }

}
