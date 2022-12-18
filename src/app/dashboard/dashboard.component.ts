import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  typeMenu:any = localStorage.getItem("user")

  constructor(
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit() {
    if (this.typeMenu) {
      this.typeMenu = JSON.parse(this.typeMenu);
    }
  }

  logout() {
    this.userService.changeLogged(false);
    localStorage.clear();
    this.router.navigate(["auth"])
  }
}
