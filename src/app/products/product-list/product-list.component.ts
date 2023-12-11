import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
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
  cols?: number;
  indexOfSelectedProduct: number = 0;
  selectedProduct: boolean = true;
  isDetailsRoute: boolean = false;  

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {
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
    const getProducts = this.productService.onFetchProducts();

    getProducts.subscribe(
      (resData: any) => {
        this.products = resData['-NlJ6Rio4nKjkJ8yZIUO'].filter((p: Product) => !!p);
        // this.productService.getProducts(resData);
      },
      errorMessage => {
        console.log(errorMessage, 'Some error on fetching products array');
      }
    );
    
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

  getSelectedProduct(product: Product){
    console.log('This selected product:', product);
    return product;
  };

  onNewProduct(){
    this.router.navigate(['/products/new'], {relativeTo: this.route});
  }  
}
