import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../services/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token');
    if (token.length == 0) {
      this.router.navigate(["/login"]);
    }

    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }

  addOrderClick(): void {
    this.router.navigate(["/orders/add"]);
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order).subscribe((response: Response) => {
      for (let index = 0; index < this.orders.length - 1; index++) {
        if (this.orders[index].orderId == order.orderId ) {
          this.orders.splice(index, 1);
          break;
        }
      }
    })
  }
}
