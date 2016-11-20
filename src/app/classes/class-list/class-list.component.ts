import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cls } from '../shared/cls.model';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  classes: Cls[] = [];
  cls: Cls;
  selectedClass: Cls;
  classesInEvent: Cls[] = [];

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

  goToDetails(cls: Cls): void {
    let link = ['/class-details', cls._id];
    this.router.navigate(link);
  }

  addNewClass(): void {
    this.router.navigate(['/class-add']);
  }

  addToEvent(cls: Cls): void {
    this.classesInEvent.push(cls);
    this.classes.splice(this.classes.indexOf(cls),1);
  }

  removeFromEvent(cls: Cls): void {
    this.classesInEvent.splice(this.classesInEvent.indexOf(cls),1);
    this.classes.push(cls);
  }

}
