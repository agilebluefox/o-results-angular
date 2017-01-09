import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  event: Event;
  students: Student[] = [];
  checked: boolean = false;

  constructor(
    private studentService: StudentService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisteredStudents();
  }

  getRegisteredStudents(): void {
    this.event = this.eventService.getSelectedEvent();
    let studentIds: string[] = this.event.students;
    studentIds.forEach((id) => {
      let currentStudent = this.studentService.getStudentById(id)
        .subscribe(
          (s) => {
            this.students.push(s);
            this.checked = true;
          }
        );
    });
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

  setStudentStatus(e, student: Student) {
    console.log(e);
    let event = this.eventService.getSelectedEvent();
    let response: Observable<Event> | void;
    if (e.checked) {
      console.log(`Add ${student._id} to the student array on the ${event.name} event`);
      this.eventService.addStudentToEvent(student._id);
      console.log(event);
    } else {
      console.log(`Remove ${student._id} from the student array on the ${event.name} event`);
      response = this.eventService.removeStudentFromEvent(student._id);
      if (response) {
        response.subscribe(
          (result) => {
            console.log(result);
          }
        );
      }
    }
  }

}
