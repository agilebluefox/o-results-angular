import { Component, Input } from '@angular/core';

import { EventService } from '../../../services/event.service';
import { Entry } from '../../../models/entry.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() result: Entry;
  @Input() count: number | string;
  // List of status types
  statuses: string[] = ['Registered', 'Checked-In', 'On-Course', 'Completed'];
  prefix: string = '204';

  constructor(private eventService: EventService) { }

  // Get the current status based on the index of the array
  getStatus(number): string {
    return this.statuses[number];
  }

  // Method to update the status when clicked
  updateStatus(statusNumber: number) {
    console.log(`The status number is: `, statusNumber);
    console.log(`The current result status index is: `, this.result.status);
    this.result.status = (statusNumber + 1) % 4;
    console.log(`The current result status index is: `, this.result.status);
    this.eventService.updateResultOnEvent(this.result);
  }

  updateCard(event) {
    let cardNumber = event.target.value;
    this.result.cardNo = (cardNumber.length > 4) ? cardNumber : this.prefix + cardNumber;
    this.eventService.updateResultOnEvent(this.result);
  }

  updateCourse(event) {
    this.result.course = event.target.value;
    this.eventService.updateResultOnEvent(this.result);
  }

}
