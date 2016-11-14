import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../shared/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  student: Student;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents()
      .then(students => this.students = students);
  }

  getStudents(): void {
    this.studentService.getStudents()
      .then(students => this.students = students);
  }

  goToDetails(student: Student): void {
    let link = ['/student-details', student._id];
    this.router.navigate(link);
  }

  addNewStudent(): void {
    this.router.navigate(['/student-add']);
  }
}
