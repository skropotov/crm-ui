import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/services/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token');
    if (token.length == 0) {
      this.router.navigate(["/login"]);
    }

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  addUserClick(): void {
    this.router.navigate(["/users/new"]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe((response: Response) => {
        for (let index = 0; index < this.users.length - 1; index++) {
          if (this.users[index].userId == user.userId ) {
            this.users.splice(index, 1);
            break;
          }
        }
    });
  }
}
