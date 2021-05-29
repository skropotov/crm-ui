import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "./client";

@Injectable()
export class ClientService {
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
    
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>('http://localhost:8080/clients', this.getOptions());
    }

    getClient(id: Number): Observable<Client> {
        return this.http.get<Client>('http://localhost:8080/clients/' + String(id), this.getOptions());
    }

    addClient(client: Client): Observable<{}> {
        return this.http.post('http://localhost:8080/clients', client, this.getOptions());
    }

    editClient(client: Client): Observable<{}> {
        return this.http.put('http://localhost:8080/clients/' + String(client.clientId), client, this.getOptions());
    }

    deleteClient(client: Client): Observable<{}> {
        return this.http.delete('http://localhost:8080/clients/' + String(client.clientId), this.getOptions());
    }
}