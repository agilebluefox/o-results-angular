import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EventService } from '../../services/event.service';
import { StudentService } from '../../services/student.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  studentAddForm: FormGroup;
  currentEvent: Event;

  constructor(
    private eventService: EventService,
    private studentService: StudentService,
    private router: Router
    ) { }

  ngOnInit() {
    this.studentAddForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[a-zA-Z0-9 ]{1,50}$/')
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[a-zA-Z0-9 ]{1,50}$/')
      ]),
      unityId: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[a-z][a-z0-9]{1,7}$/')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('/^[a-z0-9._%+-]{1,50}@[a-z0-9.-]{1,25}\.[a-z]{2,6}$/')
      ]),
    });
  }

  onSubmit() {

  }

  goBack() {
    this.currentEvent = this.eventService.getSelectedEvent();
    let link = `./event-dashboard/${this.currentEvent._id}`;
    this.router.navigate([link]);
  }

}
