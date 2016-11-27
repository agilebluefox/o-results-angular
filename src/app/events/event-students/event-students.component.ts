import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../shared/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-students',
  templateUrl: './event-students.component.html',
  styleUrls: ['./event-students.component.scss']
})
export class EventStudentsComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit() {
  }

}
