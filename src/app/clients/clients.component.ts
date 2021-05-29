import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../services/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token');
    if (token.length == 0) {
      this.router.navigate(["/login"]);
    }

    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => (this.clients = clients));
  }

  addClientClick(): void {
    this.router.navigate(["/clients/new"]);
  } 

  deleteClient(client: Client) {
    this.clientService.deleteClient(client).subscribe((response: Response) => {
      for (let index = 0; index < this.clients.length - 1; index++) {
        if (this.clients[index].clientId == client.clientId ) {
          this.clients.splice(index, 1);
          break;
        }
      }
    });
  }
}
