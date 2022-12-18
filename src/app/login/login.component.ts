import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required]),
      password: new FormControl('', [ Validators.required ]),
    });
  }

  async onLogin() {
    const { username, password } = this.loginForm.value;
    await (await this.userService.login(username, password)).subscribe(
      (data:any) => {
        if (data.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.userService.changeLogged(true);
          if (data.user.student_id) {
            this.router.navigate(["mycourses"]);
          } else if (data.user.employee_id) {
            this.router.navigate(["courses"]);
          }
        }
      },
      err => {
        console.log('---- ERROR ---- ');
        console.log(err);
      });
  }
}
