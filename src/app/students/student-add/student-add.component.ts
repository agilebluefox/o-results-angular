import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { EventService } from '../../services/event.service';
import { StudentService } from '../../services/student.service';

import { Event } from '../../models/event.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  public studentAddForm: FormGroup;
  private student: Student;
  public placeholders = {
    unityid: null,
    email: null,
    firstname: null,
    lastname: null
  };

  constructor(
    private eventService: EventService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  checkStudent(username: string) {
    const input = Observable.from(username);
    input
      .map(value => value)
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe(
      (x) => { console.log('Next: ' + x); },
      (err) => { console.log('Error: ' + err); },
      () => {
        let response = this.studentService.getStudentById(username);
        console.log(response);
        response.subscribe(
          (student$) => {
            // If the student already exists
            if (student$) {
              console.log(`The student already exists in the student collection: `, student$);
              this.student = student$;
              this.eventService.addStudentToEvent(this.student);
              this.updatePlaceholders(student$);
              console.log(this.placeholders);
            } else {
              // If the student is not in the db, fill the email field
              this.placeholders.email = `${username}@ncsu.edu`;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      });
  }

  updatePlaceholders(student: Student): any {
    this.placeholders.unityid = student.unityid;
    this.placeholders.email = student.email;
    this.placeholders.firstname = student.firstname;
    this.placeholders.lastname = student.lastname;
  }

  ngOnInit() {
    // Store the current event
    // check for route parameters - edit or add student?
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id: string = params['id'];
      console.log(`The id of the student to edit is: ${id}`);
      if (id) {
        // Get event from service
        this.studentService.getStudentById(id)
          .subscribe(
          (s) => {
            this.student = s;
            console.log(this.student);
            // Load the student property values in the form fields
            this.updatePlaceholders(s);
            console.log(this.placeholders);
            this.renderForm(this.placeholders);
          },
          error => console.log(error)
          );
      }
      this.renderForm(this.placeholders);
    });
  }

  renderForm(placeholders): void {
    this.studentAddForm = new FormGroup({
      firstname: new FormControl(placeholders.firstname, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{1,50}$')
      ]),
      lastname: new FormControl(placeholders.lastname, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{1,50}$')
      ]),
      unityid: new FormControl(placeholders.unityid, [
        Validators.required,
        Validators.pattern('^[a-z][a-z0-9]{1,7}$')
      ]),
      email: new FormControl(placeholders.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]{1,50}@[a-z0-9.-]{1,25}\.[a-z]{2,6}$')
      ]),
    });
  }

  // If the student already exists use the update method
  // Otherwise, use the add method
  onSubmit(): void {
    if (!this.student) {
      this.studentService.addStudent(this.studentAddForm.value)
        .subscribe(
        (result) => {
          this.student = result;
          console.log(this.student);
          this.eventService.addStudentToEvent(this.student);
          this.router.navigate([`/event-dashboard/`]);
        },
        error => console.log(error)
        );
    } else {
      Object.assign(this.student, this.studentAddForm.value);
      this.studentService.updateStudent(this.student)
        .subscribe(
        (data) => {
          // add the student to the event
          console.log(data);
          this.eventService.addStudentToEvent(this.student);
          this.router.navigate([`/event-dashboard/`]);
        },
        error => console.log(error),
        () => { }
        );
    }
    this.studentAddForm.reset();
  }

  getCurrentEvent() {
    return this.eventService.getSelectedEvent();
  }

  deleteStudent() {
    if (this.student) {
      console.log(`The current student is: ${this.student}`);
      let id: string = this.student._id;
      this.studentService.deleteStudent(id)
        .subscribe(
        (result) => {
          let student = result;
          console.log(student);
        },
        err => console.log(err),
        () => {
          this.goBack();
        }
        );
    } else {
      this.goBack();
    }
  }

  goBack() {
    let link = `./event-dashboard`;
    this.router.navigate([link]);
  }

}
