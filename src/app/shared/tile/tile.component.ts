import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { Product } from 'src/app/products/product.model';



@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  standalone: true,
  imports: [MatGridListModule, CommonModule]
})
export class TileComponent {
  public product: Product[] = [
    new Product('Футболка Азов', 
    'Це не просто футболка',
     'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
      445),
      new Product('Футболка ТРО', 
      'Це футболка ТРО',
       'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
        550),
        new Product('Футболка Азов', 
    'Це не просто футболка',
     'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
      445),
      new Product('Футболка ТРО', 
      'Це футболка ТРО',
       'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
        550),
        
        new Product('Футболка Азов', 
    'Це не просто футболка',
     'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
      445),
      new Product('Футболка ТРО', 
      'Це футболка ТРО',
       'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
        550),
        
        
  ];
}

