import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  eventAddForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.eventAddForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.eventAddForm);
  }

  goBack(link) {
    this.location.back();
  }

}
