import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Event } from '../shared/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  eventAddForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventAddForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.eventAddForm.value);
    this.eventService.addEvent(this.eventAddForm.value)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      this.eventAddForm.reset();
  }

  goBack(link) {
    this.location.back();
  }

}
