import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

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
      .subscribe((e:Event)=>{
        this.selectedEvent = e
      });
   // this.entries = this.getEntries();
   // console.log(`The entries property is: `, this.entries);
  }

  // Retrieve the currently selected event and grab the student property
  // getEntries(): Entry[] {
  //   //this.selectedEvent = this.eventService.getSelectedEvent();
  //   //return this.eventService.getSelectedEvent().getValue().results;
  // }

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
    let event = this.eventService.getSelectedEvent();
    let response: Observable<Event> | void;
    if (checkboxValue.checked) {

      this.eventService.addStudentToEvent(student);
      console.log(event);
    } else {

      this.eventService.removeStudentFromEvent(student);
      // Update the list of students on the page
     // this.entries = this.getEntries();
    }
  }

}
