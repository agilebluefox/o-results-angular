import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Student } from '../../models/student.model';
import { Entry } from '../../models/entry.model';
import { StudentService } from '../../services/student.service';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  selectedEvent: Event;
  entries: Entry[] = [];
  checked: boolean = true;

  constructor(
    private studentService: StudentService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventService.getSelectedEvent()
      .subscribe(
        (event: Event) => {
          this.selectedEvent = event;
          this.entries = event.results;
        }
      );
  }

  goToDetails(student: Student): void {
    let link = ['/student-details', student._id];
    this.router.navigate(link);
  }

  editStudent(student: Student) {
    // Navigate to the add component
    let link = ['/student-add', student._id];
    this.router.navigate(link);
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student._id);
  }

  setStudentStatus(checkboxValue, student: Student) {
    console.log(checkboxValue);
    if (checkboxValue.checked) {
      this.eventService.addStudentToEvent(student);
    } else {
      this.eventService.removeStudentFromEvent(student);
    }
  }

}
