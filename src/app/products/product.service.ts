import { EventEmitter, Injectable, Output } from "@angular/core";
import { Product } from "./product.model";
import { Subject } from "rxjs";
import { Tag } from "../shared/tag.model";
import { TagsListService } from "../tags-list/tags-list-service";



@Injectable()
export class ProductService {
    //productSelected = new EventEmitter<Product>();
    productsChanged = new Subject<Product[]>();
    @Output() productSelected = new EventEmitter<Product>();

    
   private products: Product[] = [
        new Product('Футболка Азов', 
        'Це не просто футболка',
         'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
          445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
          new Product('Футболка ТРО', 
          'Це футболка ТРО',
           'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
            550,[{name: 'Yellow', colorTag: '#FFD700'}]),
            new Product('Футболка Азов', 
            'Це не просто футболка',
             'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
              445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
              new Product('Футболка ТРО', 
              'Це футболка ТРО',
               'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
                550, [{name: 'Yellow', colorTag: '#FFD700'}]),
                new Product('Футболка Азов', 
                'Це не просто футболка',
                 'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
                  445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
                  new Product('Футболка ТРО', 
                  'Це футболка ТРО',
                   'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
                    550, [{name: 'Yellow', colorTag: '#FFD700'}]), new Product('Футболка Азов', 
                    'Це не просто футболка',
                     'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
                      445, [{name: 'Yellow', colorTag: '#FFD700'}]),
                      new Product('Футболка ТРО', 
                      'Це футболка ТРО',
                       'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
                        550, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}])
      ];

      constructor(private tagService: TagsListService){

      }

      getProducts() {
        return this.products.slice();
      }

      setProducts(products: Product[]) {
        this.products = products;
        console.log(this.products);
        console.log(this.productsChanged);
        this.productsChanged.next(this.products.slice());
      }

      addAllTagsToTagsManager(tags: Tag[]){
        this.tagService.addTags(tags);      
      }
}