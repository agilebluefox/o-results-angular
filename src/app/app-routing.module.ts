import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { ClassAddComponent } from './classes/class-add/class-add.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';

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
    path: 'event-details/:id',
    component: EventDetailsComponent
  },
  {
    path: 'class-add',
    component: ClassAddComponent
  },
  {
    path: 'course-add',
    component: CourseAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
