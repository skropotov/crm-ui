import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = {
    userId: undefined,
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    status: '',
    version: undefined,
    roles: []
  };

  isAdmin: Boolean = false;
  isUser: Boolean = false;

  @ViewChild("p") public popover: NgbPopover;

  constructor(private router: Router, private userService: UserService, route: ActivatedRoute) { 
    route.paramMap.subscribe(params => this.user.userId = +params.get('id'));
  }

  ngOnInit(): void {
    this.user.status = "ACTIVE";
    if (this.user.userId) {
      this.userService.getUser(this.user.userId)
        .subscribe(user => {
          this.user.firstName = user.firstName;
          this.user.lastName = user.lastName;
          this.user.username = user.username;
          this.user.status = user.status;
          this.user.version = user.version;
          this.user.roles = user.roles;

          if (this.user.roles.indexOf('ADMIN') > -1) {
            this.isAdmin = true;
          }

          if (this.user.roles.indexOf('USER') > -1) {
            this.isUser = true;
          }
        });
    } 
  }

  saveUser() {
    this.user.roles = [];
    if (this.isAdmin) {
      this.user.roles.push('ADMIN');
    }
    if (this.isUser) {
      this.user.roles.push('USER');
    }
    if (this.user.userId) {
      this.userService.editUser(this.user)
        .subscribe(
          (response: Response) => {this.router.navigate(["/users"])},
          (error) => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "USER" && 
              error.error.message.includes("Username") && error.error.message.includes("already exists")) {
                this.popover.open();
            }
            if (error.status ==400 && error.error.errorCode == "OBJECT_STALE") {
              const alert = document.getElementsByClassName("alert non-visible")[0];
              alert.classList.remove("non-visible");
            }
          }
        );
    } 
    else {
      this.userService.addUser(this.user)
        .subscribe(
          (response: Response) => {this.router.navigate(["/users"])},
          (error) => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "USER" && 
              error.error.message.includes("Username") && error.error.message.includes("already exists")) {
                this.popover.open();
            }
          }
        );
    }
  }
}
