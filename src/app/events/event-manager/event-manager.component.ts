import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EventService } from '../../services/event.service';

import { Student } from '../../models/student.model';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {

  record: FormGroup;
  results: Entry[] = [];

  constructor(
    public fb: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit() {
    // Get the students already registered for the event
    this.results = this.eventService.getSelectedEvent().results;

    // Use form builder to setup the form elements
    this.record = this.fb.group({
      studentId: '',
      studentName: '',
      cardNo: '',
      status: '',
      course: ''
    });
  }

}
