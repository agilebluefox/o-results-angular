import { Component, OnInit } from '@angular/core';

export class Event {
  name: string;
  location: string;
  date: string;
}

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

  constructor() { }

  ngOnInit() {
  }

  onSelect(event: Event): void {

  }

  addNewEvent(): void {
    
  }

}
