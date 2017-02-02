import { Component, OnInit } from '@angular/core';

import { EventService } from '../../services/event.service';

import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
  results: Entry[] = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    // Get the students already registered for the event
    //this.results = this.eventService.getSelectedEvent().results;
    console.log(`The results on the event manager is: `, this.eventService.getSelectedEvent());
  }

}
