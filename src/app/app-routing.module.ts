import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { ClassAddComponent } from './classes/class-add/class-add.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { ControlAddComponent } from './controls/control-add/control-add.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { ClassListComponent } from './classes/class-list/class-list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'event-add',
    component: EventAddComponent
  },
  {
    path: 'event-add/:id',
    component: EventAddComponent
  },
  {
    path: 'event-dashboard/:id',
    component: EventDashboardComponent
  },
  {
    path: 'class-add',
    component: ClassAddComponent
  },
  {
    path: 'course-add',
    component: CourseAddComponent
  },
  {
    path: 'control-add',
    component: ControlAddComponent
  },
  {
    path: 'class-list',
    component: ClassListComponent
  },
  {
    path: 'course-list',
    component: CourseListComponent
  },
  {
    path: 'student-list',
    component: StudentListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
