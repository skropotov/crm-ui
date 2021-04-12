import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/services/user';
import { UserService } from 'src/services/user.service';

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

  constructor(private router: Router, private userService: UserService, route: ActivatedRoute) { 
    route.paramMap.subscribe(params => this.user.userId = +params.get('id'));
  }

  ngOnInit(): void {
    this.user.status ="ACTIVE";
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
        .subscribe(() => {this.router.navigate(["/users"])});
    } 
    else {
      this.userService.addUser(this.user)
        .subscribe((response: Response) => {this.router.navigate(["/users"])});
    }
  }
}
