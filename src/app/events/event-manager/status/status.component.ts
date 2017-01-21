import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  statuses: string[] = ['Registered', 'Checked-In', 'On-Course', 'Completed'];

  currentStatus: string = this.statuses[0];
  currentBackgroundClass: string = this.currentStatus.toLowerCase();
  statusNumber: number = 0;

  updateStatus(e) {
    e.preventDefault();
    this.statusNumber += 1;
    if (this.statusNumber > 3) {
      this.statusNumber = 0;
    }
    this.currentStatus = this.statuses[this.statusNumber];
    this.currentBackgroundClass = this.currentStatus.toLowerCase();
  }

}
