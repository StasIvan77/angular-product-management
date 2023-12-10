import { EventEmitter, Injectable, Output } from "@angular/core";
import { Product } from "./product.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Tag } from "../shared/tag.model";
import { TagsListService } from "../tags-list/tags-list-service";
import { DataStorageService } from "../shared/data-storage.service";



@Injectable({
  providedIn: 'root'
})
export class ProductService {
    //productSelected = new EventEmitter<Product>();
    productsChanged = new Subject<Product[]>();
    @Output() productSelected = new EventEmitter<Product>();

    private productSelectedSource = new BehaviorSubject<Product | null>(null);
    productSelected$ = this.productSelectedSource.asObservable();
    private products: Product[] = [];
    
  //  private products: Product[] = [
  //       new Product(1,'Футболка Азов', 
  //       'Це не просто футболка',
  //        'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
  //         445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
  //         new Product(2,'Футболка ТРО', 
  //         'Це футболка ТРО',
  //          'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
  //           550,[{name: 'Yellow', colorTag: '#FFD700'}]),
  //           new Product(3, 'Футболка Азов', 
  //           'Це не просто футболка',
  //            'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
  //             445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
  //             new Product(4, 'Футболка ТРО', 
  //             'Це футболка ТРО',
  //              'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
  //               550, [{name: 'Yellow', colorTag: '#FFD700'}]),
  //               new Product(5, 'Футболка Азов', 
  //               'Це не просто футболка',
  //                'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
  //                 445, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}]),
  //                 new Product(6, 'Футболка ТРО', 
  //                 'Це футболка ТРО',
  //                  'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
  //                   550, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Blue', colorTag: '#00fff4'}]), new Product(7, 'Футболка Азов', 
  //                   'Це не просто футболка',
  //                    'https://content1.rozetka.com.ua/goods/images/big/277136496.jpg',
  //                     445, [{name: 'Yellow', colorTag: '#FFD700'}]),
  //                     new Product(8, 'Футболка ТРО', 
  //                     'Це футболка ТРО',
  //                      'https://images.prom.ua/4931710880_armejskaya-muzhskayauniseks-futbolka.jpg',
  //                       550, [{name: 'Yellow', colorTag: '#FFD700'}, {name: 'Green', colorTag: '#00FF00'}])
  //     ];

      constructor(private tagService: TagsListService, private dataStorageService: DataStorageService){
        // this.onFetchProducts();
      }

      getProducts(p : Product[]) {
        // return this.dataStorageService.fetchProducts();
        
        return p;
      }

      setProducts(products: Product[]) {
        // this.products = products;
        // @ts-ignore
        this.products = products['-NlJ6Rio4nKjkJ8yZIUO'];

        console.log(this.products, 'ppppp');
        console.log(this.productsChanged);
        this.productsChanged.next(this.products);
      }

      
      addAllTagsToTagsManager(tags: Tag[]){
        this.tagService.addTags(tags);      
      }

      setSelectedProduct(product: Product | null): void {
        this.productSelectedSource.next(product);
      }

      getSelectedProduct(): Observable<Product | null> {        
        // return this.productSelected$;
        return this.productSelected$;
      }

      onFetchProducts(){
        
        console.log("fetching");
        return this.dataStorageService.fetchProducts();
      }

      
}