import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

// import { Student } from '../../models/student.model';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {

  events: Event[] = [];
  currentEvent: Event;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // Route params are always strings
      let id: string = params['id'];
      // Get event from service
      this.eventService.getEventById(id)
        .subscribe(
          (result) => {
            this.currentEvent = result;
          },
          error => console.log(error)
        );
    });
  }

  goBack() {
    let link = ['/dashboard'];
    this.router.navigate(link);
  }

  goToStudents() {
    let link = ['/event-students'];
    this.router.navigate(link);
  }

  addNewStudent(): void {
    this.router.navigate(['/student-add']);
  }

}
