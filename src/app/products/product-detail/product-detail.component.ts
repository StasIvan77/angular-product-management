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
  products: Product[] = [];
  selectedProduct?: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
    ) {  
  }
  ngOnInit(): void {

    //some very bad code here, need help!
    const pId = this.route.snapshot.paramMap.get('productId')
    const getProductsParam = this.productService.onFetchProducts();

    getProductsParam.subscribe(
      (resData: any) => {
        //console.log(resData, ':details of a product');
        this.products = resData['-NlJ6Rio4nKjkJ8yZIUO'];
        const productForDetail = this.products.filter((p) => p && p.id.toString() === pId);
      this.productService.productSelected$.subscribe((product: Product | null) => {
      this.selectedProduct = productForDetail[0];
      },
      errorMessage => {
        console.log(errorMessage, 'some error');
      }
    );      
  });  
    this.productService.getSelectedProduct();
  }   

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
