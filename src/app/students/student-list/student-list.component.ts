import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  statusOptions: Array<string> = ['registered', 'unregistered'];
  student: Student;
  selectedEvent: Event;
  students: Student[] = [];
  checked: boolean = true;

  constructor(
    private studentService: StudentService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.students = this.getRegisteredStudents();
  }

  // Retrieve the currently selected event and grab the student property
  getRegisteredStudents(): Student[] {
    this.selectedEvent = this.eventService.getSelectedEvent();
     return this.selectedEvent.students;
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

  registerStudentInEvent(student: Student) {

  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student._id);
  }

  setStudentStatus(checkboxValue, student: Student) {
    console.log(checkboxValue);
    let event = this.eventService.getSelectedEvent();
    let response: Observable<Event> | void;
    if (checkboxValue.checked) {
      console.log(`Add ${student.unityid} to the student array on the ${event.name} event`);
      this.eventService.addStudentToEvent(student);
      console.log(event);
    } else {
      console.log(`Remove ${student.unityid} from the student array on the ${event.name} event`);
      this.eventService.removeStudentFromEvent(student);
      // Update the list of students on the page
      this.students = this.getRegisteredStudents();
    }
  }

}
