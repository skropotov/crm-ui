import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductService {
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/products', this.getOptions());
  }

  getProduct(id: Number): Observable<Product> {
    return this.http.get<Product>('http://localhost:8080/products/' + String(id), this.getOptions());
  }

  addProduct(product): Observable<{}> {
    return this.http.post('http://localhost:8080/products', product, this.getOptions());
  }

  editProduct(product: Product) : Observable<{}> {
    return this.http.put('http://localhost:8080/products/' + String(product.productId), product, this.getOptions());
  }

  deleteProduct(product: Product) : Observable<{}> {
    return this.http.delete('http://localhost:8080/products/' + String(product.productId), this.getOptions());
  }

}
