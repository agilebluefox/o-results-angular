import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  statusOptions: Array<string> = ['registered', 'unregistered'];
  students: Observable<Student[]>;
  student: Student;
  // @Output() addSelectedStudent = new EventEmitter<Student>();
  // @Output() removeSelectedStudent = new EventEmitter<Student>();
  // @Input() studentsInEvent: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.students = this.getStudents();
    console.log(this.students);
  }

  getStudents(): Observable<Student[]> {
    return this.studentService.getStudents();
  }

  goToDetails(student: Student): void {
    let link = ['/student-details', student._id];
    this.router.navigate(link);
  }

  addNewStudent(): void {
    this.router.navigate(['/student-add']);
  }

  addToEvent(student: Student): void {
    // this.addSelectedStudent.emit(student);
    // // this.studentsInEvent.push(student);
    // this.students.splice(this.students.indexOf(student), 1);
    // console.log(this.studentsInEvent);
  }

  // removeFromEvent(student: Student): void {
  //   this.removeSelectedStudent.emit(student);
  //   this.studentsInEvent.splice(this.studentsInEvent.indexOf(student), 1);
  //   this.students.push(student);
  // }

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
  
}
