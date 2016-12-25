import { Component, OnInit } from '@angular/core';

import { Event } from '../../models/event.model';
import { Student } from '../../models/student.model';
import { EventService } from '../../services/event.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-event-students',
  templateUrl: './event-students.component.html',
  styleUrls: ['./event-students.component.scss']
})
export class EventStudentsComponent implements OnInit {

  // Property for the current event
  currentEvent: Event;
  studentsInEvent: Student[] = [];

  constructor(
    private eventService: EventService,
    private studentService: StudentService
    ) { }

  ngOnInit() {
    // this.currentEvent = this.eventService.getSelectedEvent();
    // this.currentEvent.students
    //   .map((id) => this.studentService.getStudentById(id)
    //     .subscribe(
    //       student => this.studentsInEvent.push(student)
    //     ));
    console.log(this.studentsInEvent);
    console.log(this.currentEvent);
  }

  onAddSelected(student) {
    // Add the student to the current event
    // this.currentEvent.students.push(student._id);
    this.studentsInEvent.push(student);
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
