import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        let token: string = localStorage.getItem('token');

        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'token': token
            })
          };
    
        return this.http.get<User[]>('http://localhost:8080/users', httpOptions);
    }

    getUser(id: Number): Observable<User> {
      let token: string = localStorage.getItem('token');

      let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'token': token
          })
        };

        return this.http.get<User>('http://localhost:8080/users/' + String(id), httpOptions);  
    }

    addUser(user): Observable<{}> {
      let token: string = localStorage.getItem('token');

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': token
        })
      };

      return this.http.post('http://localhost:8080/users', user, httpOptions);
    }

    editUser(user: User) : Observable<{}> {
      let token: string = localStorage.getItem('token');

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': token
        })
      };

      return this.http.put('http://localhost:8080/users/' + String(user.userId), user, httpOptions);
    }

    deleteUser(user: User) : Observable<{}> {
      let token: string = localStorage.getItem('token');

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': token
        })
      };

      return this.http.delete('http://localhost:8080/users/' + String(user.userId), httpOptions);
    }
}