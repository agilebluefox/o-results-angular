import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Class } from '../shared/class';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];
  cls: Class;

  constructor(
    private classService: ClassService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.classService.getClasses()
      .then(classes => this.classes = classes);
  }

  getClasses(): void {
    this.classService.getClasses()
      .then(classes => this.classes = classes);
  }

  goToDetails(cls: Class): void {
    let link = ['/class-details', cls._id];
    this.router.navigate(link);
  }

  addNewClass(): void {
    this.router.navigate(['/class-add']);
  }

}
