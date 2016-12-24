import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';

import { EventService } from './services/event.service';
import { StudentService } from './services/student.service';

import { StudentListComponent } from './students/student-list/student-list.component';
import { EventStudentsComponent } from './events/event-students/event-students.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventAddComponent,
    EventDashboardComponent,
    StudentListComponent,
    EventStudentsComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
