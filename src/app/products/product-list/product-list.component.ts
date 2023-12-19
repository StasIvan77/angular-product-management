import { Component, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../product.model';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    RouterModule,
    ProductDetailComponent,
  ]  
})

export class ProductListComponent implements OnInit {
  @Input() product?: Product;
  @Output() products: Product[] = [];
  rowHeightParam :string= '8:9';
  cols?: number;
  indexOfSelectedProduct: number = 0;
  selectedProduct: boolean = true;
  isDetailsRoute: boolean = false;  

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
    ) {
    this.calculateCols(window.innerWidth);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Recalculate the number of columns when the window is resized
    this.calculateCols(window.innerWidth);
  }
  private calculateCols(windowWidth: number): void {
    // Adjust the number of columns based on the window width or other conditions
    if (windowWidth < 420) {
      this.rowHeightParam = '10:17';
      this.cols = 1;
    } else if   (windowWidth < 450)   {
      this.rowHeightParam = '10:11';
      this.cols = 1;
    } else if   (windowWidth < 650)   {
      this.rowHeightParam = '10:8';
      this.cols = 1;
    } else if (windowWidth < 880) {
      this.rowHeightParam = '10:7';
      this.cols = 1;
    } else if (windowWidth < 1300) {
      this.cols = 2;
    } else if (windowWidth < 1600) {
      this.rowHeightParam = '16:15';
      this.cols = 3; // Default number of columns
    } else if (windowWidth > 1600) {
      this.rowHeightParam = '8:9';
      this.cols = 4; // Default number of columns
    }
  }
  
 
  ngOnInit() {

    //добавити перевірку чи пусті продукти
    // this.productService.onFetchProducts().subscribe(response => this.productService.setProducts(response));
    // setTimeout(() => {
    //   this.products = this.productService.getProducts();
    //   console.log('My products from service', this.products)
    //     }, 3000);  
        
        
         // Check if products are already available before fetching
    if (!this.productService.getProducts().length) {
      this.productService.onFetchProducts().subscribe((response) => {
        this.productService.setProducts(response);
       // this.products = response;
        setTimeout(() => {
          this.handleProducts();
         console.log('My products from service', this.products)
            }, 3000); 
      });
    } else {
      setTimeout(() => {
        //never handling because alwasy losing instance of getProducts
        this.handleProducts();
       console.log('My products from service 2', this.products)
          }, 3000);       
    }    
  }

  OnSelected(product: Product) {  
    this.isDetailsRoute = true;
    this.indexOfSelectedProduct = this.products.indexOf(product);
    // console.log('My index is:', this.products.indexOf(product));
    // console.log(this.productService.productSelected.emit(product));
    this.productService.productSelected.next(product);
    this.productService.setSelectedProduct(product);        
    this.router.navigate([`/details/${product.id}`]);
      
  }

  private handleProducts() {
    this.products = this.productService.getProducts();
    console.log('My products from service', this.products);
  }

  getSelectedProduct(product: Product){
    console.log('This selected product:', product);
    return product;
  };

  onNewProduct(){
    this.router.navigate(['/products/new'], {relativeTo: this.route});
  }  
}
