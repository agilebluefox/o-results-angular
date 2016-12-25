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
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id: string = params['id'];
      if (id) {
        // Get event from service
        this.eventService.getEventById(id)
          .subscribe(
          (result) => {
            this.event = result;
            console.log(this.event);
            // Load the event property values in the form fields
            this.placeholders = {
              name: this.event.name,
              location: this.event.location,
              date: this.event.date
            };
            this.renderForm(this.placeholders);
          },
          error => console.log(error)
          );
      }
      this.renderForm(this.placeholders);
    });
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
    if (!this.event) {
      this.eventService.addEvent(this.eventAddForm.value)
        .subscribe(
        (result) => {
          this.event = result;
        },
        error => console.log(error),
        () => {
          this.router.navigate([`/event-dashboard/${this.event._id}`]);
        }
        );
    } else {
      Object.assign(this.event, this.eventAddForm.value);
      this.eventService.updateEvent(this.event)
        .subscribe(
        (data) => {
          this.router.navigate([`/event-dashboard/${this.event._id}`]);
        },
        error => console.log(error)
        );
    }
    this.eventAddForm.reset();
  }

  goBack(link) {
    this.location.back();
  }
}
