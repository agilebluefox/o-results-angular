import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../events/shared/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  events: Event[] = [];

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
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .then(events => this.events = events.slice(0,3));
  }

  /**
   * Get the events.
   */
  getEvents(): void {
    // Resolves a promise from the EventService
    this.eventService.getEvents().then(events => this.events = events);
  }

  goToDetails(event: Event): void {
    let link = ['/event-dashboard', event.id];
    this.router.navigate(link);
  }
/**
 * Add a new event
 */
  addNewEvent(): void {
    // Navigate to the add form component
    this.router.navigate(['/event-add']);
  }

}
