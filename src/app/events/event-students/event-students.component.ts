import { Component, OnInit, Output } from '@angular/core';

import { Event } from '../shared/event.model';
import { Student } from '../../students/shared/student.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-students',
  templateUrl: './event-students.component.html',
  styleUrls: ['./event-students.component.scss']
})
export class EventStudentsComponent implements OnInit {

  // Property for the current event
  currentEvent: Event;
  @Output() studentsInEvent: Student[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.currentEvent = this.eventService.getSelectedEvent();
    this.studentsInEvent = this.currentEvent.students;
    console.log(this.studentsInEvent);
    console.log(this.currentEvent);
  }

  onSelected(student) {
    // Add the student to the current event
    this.currentEvent.students.push(student._id);
    console.log(this.currentEvent);
    this.eventService.updateEvent(this.currentEvent)
      .subscribe(
      res => console.log(res),
      err => console.log(err),
      () => console.log('done')
      );
    console.log(this.currentEvent);
  }

}
