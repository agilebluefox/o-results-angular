import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  // List of status types
  statuses: string[] = ['Registered', 'Checked-In', 'On-Course', 'Completed'];
  // The current status of the student, defaults to 'Registered'
  currentStatus: string = this.statuses[0];
  // Property to represent the CSS class for each status type
  currentBackgroundClass: string = this.currentStatus.toLowerCase();
  // Counter to determine the index number of the status in the array
  statusNumber: number = 0;

  // Method to update the status when clicked
  updateStatus(e) {
    e.preventDefault();
    // Increment the index on each click
    this.statusNumber += 1;
    // Reset the status when the end of the list is reached
    if (this.statusNumber > 3) {
      this.statusNumber = 0;
    }
    this.currentStatus = this.statuses[this.statusNumber];
    // Change the CSS class when the status changes
    this.currentBackgroundClass = this.currentStatus.toLowerCase();
  }

}
