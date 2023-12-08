import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../product.model';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    ProductItemComponent,
    MatGridListModule,
    MatCardModule
  ]
  
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
