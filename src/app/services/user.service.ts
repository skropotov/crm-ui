import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getOptions() {
      let token: string = localStorage.getItem('token');
  
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'token': token
        })
      };
  
      return httpOptions;
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:8080/users', this.getOptions());
    }

    getUser(id: Number): Observable<User> {
        return this.http.get<User>('http://localhost:8080/users/' + String(id), this.getOptions());  
    }

    addUser(user): Observable<{}> {
      return this.http.post('http://localhost:8080/users', user, this.getOptions());
    }

    editUser(user: User) : Observable<{}> {
      return this.http.put('http://localhost:8080/users/' + String(user.userId), user, this.getOptions());
    }

    deleteUser(user: User) : Observable<{}> {
      return this.http.delete('http://localhost:8080/users/' + String(user.userId), this.getOptions());
    }
}