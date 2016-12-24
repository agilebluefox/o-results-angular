import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { EventStudentsComponent } from './events/event-students/event-students.component';

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
    path: 'event-students',
    component: EventStudentsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
