import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// Service
import { UserService } from './services/user.service';
import { InstituteService } from './services/institute.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend_cefcae';
  loggedIn$: BehaviorSubject<boolean>;

  constructor(
    private userService: UserService,
    private instituteService: InstituteService,
    private router: Router
  ) {}

  async ngOnInit() {
    (await this.instituteService.getInstitute()).subscribe(
      (data:any) => {
        if (data.ok) {
          localStorage.setItem("id_institute", data.institutes[0].id)
        }
      }
    );

    this.loggedIn$  =  this.userService.isLoggedIn;
    this.userService.isLoggedIn.subscribe(
      status => {
        if (status) {
          let userLogged:any = localStorage.getItem("user");
          userLogged = JSON.parse(userLogged);
          if (userLogged.student_id) {
            this.router.navigate(["mycourses"]);
          } else {
            this.router.navigate(["courses"]);
          }
        }
      }
    )

    let userLogged:any = localStorage.getItem("user");
    userLogged = JSON.parse(userLogged);
    if (userLogged) {
      this.userService.changeLogged(true);

      if (userLogged.student_id) {
        this.router.navigate(["mycourses"]);
      } else {
        this.router.navigate(["courses"]);
      }
    } else {
      this.router.navigate(["auth"]);
      this.userService.changeLogged(false);
    }
  }
}
