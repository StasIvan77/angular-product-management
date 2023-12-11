import { Injectable, Output } from "@angular/core";
import { Product } from "./product.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Tag } from "../shared/tag.model";
import { TagsListService } from "../tags-list/tags-list-service";
import { DataStorageService } from "../shared/data-storage.service";



@Injectable({
  providedIn: 'root'
})
export class ProductService {
    productsChanged = new Subject<Product[]>();
    @Output() productSelected = new Subject<Product>();

    private productSelectedSource = new BehaviorSubject<Product | null>(null);
    productSelected$ = this.productSelectedSource.asObservable();
    private products: Product[] = [];    
 
      constructor(private tagService: TagsListService, private dataStorageService: DataStorageService){
        // this.onFetchProducts();
      }

      setProducts(products: Product[]) {        
        // @ts-ignore
        this.products = products['-NlJ6Rio4nKjkJ8yZIUO'];
        this.productsChanged.next(this.products);
      }

      
      addAllTagsToTagsManager(tags: Tag[]){
        console.log('Show my products', this.products);
        //this.dataStorageService.products.forEach(myTags => { tags.push(...myTags.tags) } );
        console.log('My imported tags', tags);
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