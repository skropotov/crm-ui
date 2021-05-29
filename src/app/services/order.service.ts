import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order";

@Injectable()
export class OrderService {
    constructor(private http: HttpClient) {}

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

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('http://localhost:8080/orders', this.getOptions());
    }

    getOrder(id: Number): Observable<Order> {
        return this.http.get<Order>('http://localhost:8080/orders/' + String(id), this.getOptions());
    }

    addOrder(order: Order): Observable<{}> {
        return this.http.post('http://localhost:8080/orders', order, this.getOptions());
    }

    editOrder(order: Order): Observable<{}> {
        return this.http.put('http://localhost:8080/orders/' + String(order.orderId), order, this.getOptions());
    }

    deleteOrder(order: Order): Observable<{}> {
        return this.http.delete('http://localhost:8080/orders/' + String(order.orderId), this.getOptions());
    }
}