import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../services/client';
import { ClientService } from '../services/client.service';
import { Order } from '../services/order';
import { OrderService } from '../services/order.service';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  order: Order = {
    orderId: undefined,
    orderDate: "",
    clientId: undefined,
    clientName: "",
    productId: undefined,
    productName: "",
    amount: undefined,
    status: "",
    version: undefined
  }

  clients: Client[];
  products: Product[];
  @ViewChild("p") public popover: NgbPopover;

  
  constructor(private router: Router, private orderService: OrderService, private clientService: ClientService,
    private productService: ProductService, private route: ActivatedRoute) { 
      route.paramMap.subscribe(params => {
        this.order.orderId = +params.get('id');
      });
    }

  ngOnInit(): void {
    this.order.status = 'ACTIVE';
    this.productService.getProducts().subscribe(x => this.products = x);
    this.clientService.getClients().subscribe(x => this.clients = x);

    if (this.order.orderId) {
      this.orderService.getOrder(this.order.orderId).subscribe(
        x => {
          this.order.orderDate = x.orderDate;
          this.order.clientId = x.clientId;
          this.order.clientName = x.clientName;
          this.order.productId = x.productId;
          this.order.productName = x.productName;
          this.order.amount = x.amount;
          this.order.version = x.version;
        }
      );
    }
  }

  saveOrder(): void {
    if (this.order.orderId) {
      this.orderService.editOrder(this.order)
        .subscribe(
          (response: Response) => this.router.navigate(["/orders"]),
          error => {
            console.log(error);
            if (error.status == 400 && error.error.errorCode == "ORDER" && 
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
      this.orderService.addOrder(this.order)
        .subscribe(
          (response: Response) => this.router.navigate(["/orders"]),
          error => {
            console.log(error);
            error => {
              console.log(error);
              if (error.status == 400 && error.error.errorCode == "ORDER" && 
                error.error.message.includes("already exists")) {
                  this.popover.open();
              }
              if (error.status ==400 && error.error.errorCode == "OBJECT_STALE") {
                const alert = document.getElementsByClassName("alert non-visible")[0];
                alert.classList.remove("non-visible");
              }
            }
        }
      )
    }
  }
}
