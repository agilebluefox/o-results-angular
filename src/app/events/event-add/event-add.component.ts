import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  event: Event = null;
  private isUpdate = false;

  placeholders: any = {
    name: null,
    location: null,
    date: null
  };
  eventAddForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private eventService: EventService
  ) { }

  // If the user selected an event to edit, insert the values for 
  // the expected properties in the form fields.
  // Otherwise, present the user with a blank form.
  ngOnInit() {
    // Get event from service
    this.eventService.getSelectedEvent()
      .subscribe(
      (event: Event) => {
        console.log(event);
        if (event) {
          this.isUpdate = true;
          // Load the event property values in the form fields
          this.placeholders = {
            name: event.name,
            location: event.location,
            date: event.date
          };
          this.renderForm(this.placeholders);
        } else {

          this.renderForm(this.placeholders);
        }
      },
      error => console.log(error)
      ).unsubscribe();
  }

  renderForm(placeholders): void {
    this.eventAddForm = new FormGroup({
      name: new FormControl(placeholders.name, Validators.required),
      location: new FormControl(placeholders.location, Validators.required),
      date: new FormControl(placeholders.date, Validators.required)
    });
  }

  // If the event already exists use the update method
  // Otherwise, use the add method
  onSubmit(): void {
    console.log(this.eventAddForm.value);
    if (!this.isUpdate) {
      this.eventService.addEvent(this.eventAddForm.value)
        .subscribe(
        (result) => {
          this.router.navigate([`/event-dashboard/`]);
        },
        error => console.log(error),
      ).unsubscribe();
    } else {
      this.eventService.getSelectedEvent()
        .subscribe(
        (event: Event) => {
          Object.assign(event, this.eventAddForm.value);
          this.eventService.updateEvent(event)
            .subscribe(
            (data) => {
              this.router.navigate([`/event-dashboard/${this.event._id}`]);
            },
            error => console.log(error)
            );
        }).unsubscribe();
    }
    this.eventAddForm.reset();
  }

  goBack(link) {
    this.location.back();
  }
}
