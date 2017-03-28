import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { EventStudentsComponent } from './events/event-students/event-students.component';
import { StudentAddComponent } from './students/student-add/student-add.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    // Match the entire route since the empty string can match multiple routes
    pathMatch: 'full'
  },
  {
    path: 'event-add',
    component: EventAddComponent
  },
  {
    path: 'event-dashboard',
    component: EventDashboardComponent
  },
  {
    path: 'event-students',
    component: EventStudentsComponent
  },
  {
    path: 'student-add',
    component: StudentAddComponent
  },
  {
    path: 'student-add/:id',
    component: StudentAddComponent
  }
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   component: PageNotFoundComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
