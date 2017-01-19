import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EventService } from '../../services/event.service';

import { Student } from '../../models/student.model';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {

  entry: FormGroup;
  studentsInEvent: Student[] = [];

  constructor(
    public fb: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    // Get the students already registered for the event
    this.studentsInEvent = this.eventService.getSelectedEvent().students;

    // Use form builder to setup the form elements
    this.entry = this.fb.group({
      studentId: '',
      studentName: '',
      cardNo: '',
      status: '',
      course: ''
    });
  }

}
