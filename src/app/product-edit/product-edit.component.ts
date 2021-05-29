import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    productId: undefined,
    name: '',
    description: '',
    price: undefined,
    vendorCode: '',
    barCode: '',
    status: '',
    version: undefined
  }

  @ViewChild("p") public popover: NgbPopover;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { 
    route.paramMap.subscribe(params => {
      this.product.productId = +params.get('id');
    });
  }

  ngOnInit(): void {
    this.product.status = "ACTIVE";
    if (this.product.productId) {
      this.productService.getProduct(this.product.productId)
        .subscribe(x => {
          this.product.name = x.name;
          this.product.description = x.description;
          this.product.vendorCode = x.vendorCode;
          this.product.barCode = x.barCode;
          this.product.price = x.price;
          this.product.status = x.status;
          this.product.version = x.version;
        })
    }
  }

  saveProduct() {
    if(this.product.productId) {
      this.productService.editProduct(this.product)
        .subscribe(
          (response: Response) => this.router.navigate(["/products"]),
          error => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "PRODUCT" && 
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
      this.productService.addProduct(this.product)
        .subscribe(
          (response: Response) => this.router.navigate(["/products"]),
          error => {
            console.log(error.error);
            if (error.status == 400 && error.error.errorCode == "PRODUCT" && 
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
