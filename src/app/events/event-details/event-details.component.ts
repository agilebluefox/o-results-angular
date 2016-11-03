import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../../events/shared/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

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
      this.eventService.getEvent(id)
        .then(event => this.event = event);
        console.log(this.event);
    });
  }

  goBack(link) {
    this.location.back();
  }

  addClass() {
    let link = ['/class-add'];
    this.router.navigate(link);
  }

  addCourse() {
    let link = ['/course-add'];
    this.router.navigate(link);
  }

}
