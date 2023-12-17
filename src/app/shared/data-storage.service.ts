import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Product } from "../products/product.model";
import { BehaviorSubject, Observable, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    public products: Product[] = [];
    private productsBehave: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    products$ = this.productsBehave.asObservable();
    savedProducts: Product[] = [];
    constructor(private http: HttpClient) {}

    storeProducts(products: Product[]) {
        //const products = this.productService.getProducts();
        return this.http.post('https://angular-product-manageme-6e745-default-rtdb.europe-west1.firebasedatabase.app/products.json', products)
            .subscribe(response => console.log(response));
    }

    fetchProducts(): Observable<Product[]> {
        return this.http
          .get<{ [key: string]: Product[] }>('https://angular-product-manageme-6e745-default-rtdb.europe-west1.firebasedatabase.app/products.json')
          .pipe(
            map((productsResponse: { [key: string]: Product[] }) => {
            //Need to change bacause some data doubling and there an array of objects indside objects
              const firstObjectKey = Object.keys(productsResponse)[0];
              const productsArray = productsResponse[firstObjectKey] || [];
              return productsArray.filter(product => product !== null);
            }),
            tap((products: Product[]) => {
              this.products = products;
              localStorage.setItem('products', JSON.stringify(products));
              console.log("Products after fetching:", this.products);
            })
          );
      }
    //тут добавити getProductById який повертає суто по айдішці product З локально збережених продуктів
    getProductById(productId: number){
        //console.log(this.products)
        if (this.products && this.products.length === 0) {
            this.products = this.getProducts();             
          }
       return this.products.find((product: Product) => product.id === productId);
    }

    //чи нормальний цей підхід в даниій програмі зберігати продукти? 
    //також варто добавити апдейт продуктів після того як вони ззовні редагувались
    // щоб апдейтило з масиву поїх продуків в локальній памяті відповідний продукт
    getProducts(){        
      
        const savedPrdocutsString = localStorage.getItem('products');
        if (savedPrdocutsString !== null) {
            this.savedProducts = JSON.parse(savedPrdocutsString) as Product[];
           // console.log('Retrieved tags:',  this.savedTags);
          } else {
           // console.log('No tags found in localStorage.');
          }
       console.log('My local storage save',  this.savedProducts);
   
        return this.savedProducts || [];
      }


        
    // }
}