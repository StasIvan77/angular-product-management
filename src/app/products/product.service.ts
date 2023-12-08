import { EventEmitter } from "@angular/core";
import { Product } from "./product.model";

export class ProductService {
    productSelected = new EventEmitter<Product>();

   private products: Product[] = [
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
                    550), new Product('Футболка Азов', 
                    'Це не просто футболка',
                     'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
                      445),
                      new Product('Футболка ТРО', 
                      'Це футболка ТРО',
                       'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
                        550)
      ];

      getProducts() {
        return this.products.slice();
      }
}