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

    //private sharedProducts$: Observable<Product[]>;

    private productSelectedSource = new BehaviorSubject<Product | null>(null);
    productSelected$ = this.productSelectedSource.asObservable();
    private products: Product[] = [];    


    private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    products$ = this.productsSubject.asObservable();

 
      constructor(private dataStorageService: DataStorageService){
      //this.sharedProducts$ = this.onFetchProducts();
      // setTimeout(() => {
      //   this.products = this.getProducts();
      // }, 3000);
        
      }


      //тут треба змінити код, так як вже в dataStorageService.getProducts() є мої продукти
      setProducts(products: Product[]) {        
     
        this.products = products;
        this.productsChanged.next(this.products.slice());
        console.log('SetedProducts() from product Service:', this.products);
        this.setProductsSubject(this.products);
      }


      setProductsSubject(products: Product[]) {
        this.productsSubject.next(products);
      }

      getProducts(): Product[] {
        console.log('My products in Product Service getProducts():', this.products);
        return this.products;
      }
     

      setSelectedProduct(product: Product | null): void {
        
        this.productSelectedSource.next(product);
      }

      getSelectedProduct() {        
        // return this.productSelected$;
        //console.log('sharedProducts:',this.sharedProducts$);
      }

      onFetchProducts(){  
       return this.dataStorageService.fetchProducts();
      }      
}