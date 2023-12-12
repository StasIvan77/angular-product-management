import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';

import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
   standalone: true,
   imports: [
    CommonModule,
    ProductListComponent],
  providers: [ProductService]

})
export class ProductsComponent implements OnInit {  


  constructor() {}

  ngOnInit() {    
    // this.products = this.productService.getProducts();
    // this.products = this.data
  }


}
