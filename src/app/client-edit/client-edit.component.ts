import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/services/user';
import { UserService } from 'src/services/user.service';
import { Client } from '../services/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  client: Client = {
    clientId: undefined,
    name: "",
    managerId: undefined,
    managerName: "",
    phone: "",
    email: "",
    region: "",
    address: "",
    status: "",
    version: undefined
  }

  users: User[];

  @ViewChild("p") public popover: NgbPopover;
  
  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute,
    private userService: UserService) { 
    route.paramMap.subscribe(params => {
      this.client.clientId = +params.get('id');
    });
  }

  ngOnInit(): void {
    this.client.status = "ACTIVE";
    this.userService.getUsers().subscribe(x => this.users = x);

    if(this.client.clientId) {
      this.clientService.getClient(this.client.clientId)
        .subscribe(x => {
          this.client.name = x.name;
          this.client.managerId = x.managerId;
          this.client.managerName = x.managerName;
          this.client.phone = x.phone;
          this.client.email = x.email;
          this.client.region = x.region;
          this.client.address = x.address;
          this.client.version = x.version;
        })
    }
  }

  saveClient() {
    if (this.client.clientId) {
      this.clientService.editClient(this.client)
        .subscribe(
          (response: Response) => this.router.navigate(["/clients"]),
          error => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "CLIENT" && 
              error.error.message.includes("already exists")) {
                this.popover.open();
            }
            if (error.status ==400 && error.error.errorCode == "OBJECT_STALE") {
              const alert = document.getElementsByClassName("alert non-visible")[0];
              alert.classList.remove("non-visible");
            }
          }
        )
    }
    else {
      this.clientService.addClient(this.client)
        .subscribe(
          (response: Response) => this.router.navigate(["/clients"]),
          error => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "CLIENT" && 
              error.error.message.includes("already exists")) {
                this.popover.open();
            }
            if (error.status ==400 && error.error.errorCode == "OBJECT_STALE") {
              const alert = document.getElementsByClassName("alert non-visible")[0];
              alert.classList.remove("non-visible");
            }
          }
        )
    }
  }
}
