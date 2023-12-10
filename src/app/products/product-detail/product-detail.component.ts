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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
  product?: Product | null;
  private routeSub?: Subscription;
  products: Product[] = [];
  selectedProduct?: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    
  }
  ngOnInit(): void {
    const pId = this.route.snapshot.paramMap.get('productId')
    const xObs = this.productService.onFetchProducts();

    xObs.subscribe(
      (resData: any) => {
        console.log(resData, '99999999!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.products = resData['-NlJ6Rio4nKjkJ8yZIUO'];
        const productForDetail = this.products.filter((p) => p && p.id.toString() === pId);
      this.productService.productSelected$.subscribe((product: Product | null) => {
      this.selectedProduct = productForDetail[0];


      },
      errorMessage => {
        console.log(errorMessage, '2233333333');
      }
    );
  
    
    // console.log('xxxxxxxxxxxxxxxx', this.products)

   
    
  });
  
  this.productService.getSelectedProduct();
  }   

  handleSelectedProduct(product: Product): void {
    // Perform additional processing or actions based on the selected product
   
  //  this.handleSelectedProduct(this.selectedProduct);
    console.log('Handling selected product:', product);
    // this.productService.getSelectedProduct(product);
  }
}
