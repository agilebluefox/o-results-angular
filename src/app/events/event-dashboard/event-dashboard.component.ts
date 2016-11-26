import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../../events/shared/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {

  events: Event[] = [];
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id: string = params['id'];
      // Get event from service
      this.eventService.getPopulatedEvent(id)
        .then((event) => { 
          this.event = event;
          console.log(this.event);
        });
      
    });
  }

  goBack(link) {
    this.location.back();
  }

  goToClasses() {
    let link = ['/class-list'];
    this.router.navigate(link);
  }

  goToCourses() {
    let link = ['/course-list'];
    this.router.navigate(link);
  }

  goToStudents() {
    let link = ['/student-list'];
    this.router.navigate(link);
  }

  goToResults() {
    let link = ['/event-results'];
    this.router.navigate(link);
  }
}
