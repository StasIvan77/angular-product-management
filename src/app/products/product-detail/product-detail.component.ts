import { ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule,
    CommonModule, ProductListComponent, MatGridListModule,
    MatCardModule,
    MatChipsModule,
    RouterModule  
  ]
})
export class ProductDetailComponent {
  product: Product | null = null;
  products: Product[] = [];
  selectedProduct?: Product | null = null;

  constructor(private productService: ProductService, private router: Router, private productListComponent: ProductListComponent, private cdr: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {
   this.products = this.productService.getProducts();
  this.productService.productSelected$.subscribe((product: Product | null) => {
    this.selectedProduct = product;
    console.log('selected PRODUCT:', this.selectedProduct?.name);   
    console.log('MY SELECTED', this.selectedProduct);
    //this.productService.productSelected$.
    
    
  });
  
  this.productService.getSelectedProduct();
  }   

  handleSelectedProduct(product: Product | null): void {
    // Perform additional processing or actions based on the selected product
   
  //  this.handleSelectedProduct(this.selectedProduct);
    console.log('Handling selected product:', product);
    this.productService.getSelectedProduct();
    this.cdr.detectChanges();
  }
}
