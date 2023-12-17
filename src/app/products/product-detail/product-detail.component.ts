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
import { DataStorageService } from 'src/app/shared/data-storage.service';

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
  selectedProduct?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private dataStorageService: DataStorageService
    ) {  
  }
  ngOnInit(): void {
    let productById: Product | undefined;

    //some improves needed
    const pId = this.route.snapshot.paramMap.get('productId')
    console.log("selected producst id:", pId);

    //No need at least now
    //this.products = this.dataStorageService.getProducts();  
    
    if(pId) {
      productById = this.dataStorageService.getProductById(parseInt(pId));
    }
    this.selectedProduct = productById;   
  }   

  
  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
