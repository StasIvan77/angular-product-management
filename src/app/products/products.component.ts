import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductModule } from './products.module';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';

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
    ProductItemComponent],
  providers: [ProductService]

})
export class ProductsComponent implements OnInit {  
  selectedProduct?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.productSelected.subscribe((product: Product) => {
      this.selectedProduct = product;
    });
  }

}
