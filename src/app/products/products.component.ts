import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    let token: String = localStorage.getItem('token');
    if (token.length == 0) {
      this.router.navigate(["/login"]);
    }

    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(x => this.products = x);
  }

  addProductClick(): void {
    this.router.navigate(["/products/new"]);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe((response: Response) => {
      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index].productId == product.productId ) {
          this.products.splice(index, 1);
          break;
        }
      }
    });
  }
}
