import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventDashboardComponent } from './events/event-dashboard/event-dashboard.component';
import { ClassAddComponent } from './classes/class-add/class-add.component';

import { EventService } from './services/event.service';
import { ClassService } from './services/class.service';
import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';

import { CourseAddComponent } from './courses/course-add/course-add.component';
import { ControlAddComponent } from './controls/control-add/control-add.component';
import { MenuComponent } from './menu/menu.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { ClassListComponent } from './classes/class-list/class-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventAddComponent,
    EventDashboardComponent,
    ClassAddComponent,
    CourseAddComponent,
    ControlAddComponent,
    MenuComponent,
    StudentListComponent,
    CourseListComponent,
    ClassListComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    EventService,
    ClassService,
    StudentService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
