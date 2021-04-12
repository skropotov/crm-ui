import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { Token } from 'src/services/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: String;
  password: String;

  constructor(private loginService: LoginService, private router: Router, 
    private el: ElementRef) { }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token');
    if (token.length > 0) {
      this.router.navigate(["/"]);
    }
  }

  onLogin() {
    let token: String;
    console.log("login=" + this.login + " pw=" + this.password);
    this.loginService.login(this.login, this.password)
      .subscribe(
        (value: Token) => {
          token = value.value;
          localStorage.setItem('token', String(token));
          this.router.navigate(["/"]); 
        },
        err => {
          if (err.error instanceof Error) {
            console.error('An error occurred:', err.error.message);
          } else {
            if (err.status == 500) {
              let warn = this.el.nativeElement.getElementsByClassName('non-visible');
              if (warn.length > 0) {
                console.log(warn.item(0));
                warn.item(0).classList.remove('non-visible');
              }
            } 
          }
        }
      ); 
  }

}
