import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Course } from '../shared/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  course: Course;

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  getCourses(): void {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  goToDetails(course: Course): void {
    let link = ['/course-details', course._id];
    this.router.navigate(link);
  }

  addNewCourse(): void {
    this.router.navigate(['/course-add']);
  }

}
