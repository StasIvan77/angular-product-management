import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  standalone: true
})
export class ProductItemComponent implements OnInit {

  constructor(private productService: ProductService) {

  }

  ngOnInit() {}

  onSelected() {
    //this.productService.productSelected.emit(this.product);
  }
}
