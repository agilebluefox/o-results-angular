import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Event } from '../../events/shared/event';
import { EVENTS } from '../../shared/mock-events';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  events = EVENTS;
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id = params['id'];
      this.event = this.events.find(event => event.id === id); // move to service
      // this.heroService.getHero(id)
      //   .then(hero => this.hero = hero);
    });
  }

}
