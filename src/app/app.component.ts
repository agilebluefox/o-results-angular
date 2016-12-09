import { Component, OnInit, Output } from '@angular/core';

import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oResults';
  @Output() events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    let populate = false;
    let active = true;
    this.eventService.getEvents((events) => { this.events = events; }, populate, active);
  }

}
