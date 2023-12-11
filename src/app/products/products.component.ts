import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductModule } from './products.module';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
   standalone: true,
   imports: [
    MatButtonModule,
    MatDividerModule, 
    MatIconModule, 
    ProductModule,
    ProductListComponent, 
    ProductDetailComponent,
    CommonModule],
  providers: [ProductService]

})
export class ProductsComponent implements OnInit {  
  selectedProduct: Product | null = null;
  productSelected: Product | null = null;
  showProductList = true;
  products: Product[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit() {    
    // this.products = this.productService.getProducts();
    // this.products = this.data
  }

  onProductSelected(product: Product): void {
    this.selectedProduct = product;    
  }
}
