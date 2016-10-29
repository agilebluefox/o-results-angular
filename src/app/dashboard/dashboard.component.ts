import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../events/shared/event';

const EVENTS: Event[] = [
  {
    name: '2016 Fall Umstead Park',
    location: 'Umstead Park',
    date: '2016-12-04'
  },
  {
    name: '2016 Spring Umstead Park',
    location: 'Umstead Park',
    date: '2016-02-21'
  },
  {
    name: '2015 Fall Umstead Park',
    location: 'Umstead Park',
    date: '2015-12-05'
  }
];

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  events = EVENTS;
  selectedEvent: Event;

  constructor(private router: Router) { 
        
  }

  ngOnInit() {
  }

  onSelect(event: Event): void {
    console.log(event.name);
    this.selectedEvent = event;
    //  this.router.navigate(['/event-details', event.name]);
  }

  addNewEvent(): void {
        this.router.navigate(['/event-add']);
  }

}
