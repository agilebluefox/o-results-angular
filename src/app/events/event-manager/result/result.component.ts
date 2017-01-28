import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Entry } from '../../../models/entry.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() result: Entry;
  @Input() count: number | string;
  // List of status types
  statuses: string[] = ['Registered', 'Checked-In', 'On-Course', 'Completed'];
  // The current status of the student, defaults to 'Registered'
  currentStatus: string = this.statuses[0];
  // Property to represent the CSS class for each status type
  currentBackgroundClass: string = this.currentStatus.toLowerCase();
  // Counter to determine the index number of the status in the array
  statusNumber: number = 0;
  // The form group to represent the form
  record: FormGroup;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    // Use form builder to setup the form elements
    this.record = this.fb.group({
      card: '',
      course: ''
    });

  }

  // Method to update the status when clicked
  updateStatus() {
    // Increment the index on each click
    this.statusNumber = (this.statusNumber + 1) % 4;
    this.currentStatus = this.statuses[this.statusNumber];
    // Update the status property of the result for the student
    this.result.status = this.currentStatus;

    // Change the CSS class when the status changes
    this.currentBackgroundClass = this.currentStatus.toLowerCase();
  }

}
