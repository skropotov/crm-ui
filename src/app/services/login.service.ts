import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'

  })
};

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  login(Login: String, Password: String) {
    const loginObj = {
      login: Login,
      password: Password
    }
    let token: String;

    return this.http.post('http://localhost:8080/login', loginObj);
  }
}
