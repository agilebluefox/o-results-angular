import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

    goBack(link) {
    this.location.back();
  }

}
