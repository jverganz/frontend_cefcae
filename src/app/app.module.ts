import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

// Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadquarterComponent } from './dashboard/headquarters/headquarters.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { DialogHeadquarter } from './dashboard/headquarters/dialog-headquarter.component';
import { DialogCourse } from './dashboard/courses/dialog-course.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { DialogEmployee } from './dashboard/employee/dialog-employee.component';
import { StudentComponent } from './dashboard/student/student.component';
import { DialogStudent } from './dashboard/student/dialog-student.component';
import { EnrollmentComponent } from './dashboard/enrollments/enrollments.component';
import { DialogEnrollment } from './dashboard/enrollments/dialog-enrollment.component';
import { MyCoursesComponent } from './dashboard/mycourses/mycourses.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeadquarterComponent,
    CoursesComponent,
    DialogHeadquarter,
    DialogCourse,
    EmployeeComponent,
    DialogEmployee,
    StudentComponent,
    DialogStudent,
    EnrollmentComponent,
    DialogEnrollment,
    MyCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
