import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EnrollmentComponent } from './dashboard/enrollments/enrollments.component';
import { HeadquarterComponent } from './dashboard/headquarters/headquarters.component';
import { MyCoursesComponent } from './dashboard/mycourses/mycourses.component';
import { StudentComponent } from './dashboard/student/student.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {
  //   path: "",
  //   pathMatch: "full",
  //   redirectTo: "auth"
  // },
  {
    path: "auth",
    component: LoginComponent
  },
  {
    path: "courses",
    component: CoursesComponent
  },
  {
    path: "headquarters",
    component: HeadquarterComponent
  },
  {
    path: "employees",
    component: EmployeeComponent
  },
  {
    path: "students",
    component: StudentComponent
  },
  {
    path: "enrollments",
    component: EnrollmentComponent
  },
  {
    path: "mycourses",
    component: MyCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
