import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Product } from '../product.model';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';



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
    MatCardModule,
    MatChipsModule
    
  ]
  
})
export class ProductListComponent implements OnInit {
  @Output() productSelected = new EventEmitter<Product>();
  @Output() productWasSelected = new EventEmitter<Product>();

  cols?: number;
  
  products: Product[] = this.productService.getProducts();

  constructor(private productService: ProductService ) {
    this.calculateCols(window.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Recalculate the number of columns when the window is resized
    this.calculateCols(window.innerWidth);
  }
  private calculateCols(windowWidth: number): void {
    // Adjust the number of columns based on the window width or other conditions
    if (windowWidth < 560) {
      this.cols = 1;
    } else if (windowWidth < 850) {
      this.cols = 2;
    } else if (windowWidth < 1150) {
      this.cols = 3;
    } else if (windowWidth < 1400) {
      this.cols = 4; // Default number of columns
    } else if (windowWidth > 1400) {
      this.cols = 5; // Default number of columns
    }
  }
  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  OnSelected(product: Product) {    
      this.productSelected.emit(product);
  }

 
}
