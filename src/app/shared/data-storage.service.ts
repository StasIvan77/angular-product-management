import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Product } from "../products/product.model";
import { ProductService } from "../products/product.service";
import { map, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    
    constructor(private http: HttpClient) {}

    storeProducts(products: Product[]) {
        //const products = this.productService.getProducts();
        return this.http.post('https://angular-product-manageme-6e745-default-rtdb.europe-west1.firebasedatabase.app/products.json', products)
            .subscribe(response => console.log(response));
    }

    fetchProducts() {
        return this.http.get<Product[]>('https://angular-product-manageme-6e745-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        .pipe(map(products => {
            return products
        }), tap(products => {
            console.log('222222222222222222222222222', products)
            return products

            // this.productService.setProducts(products);
        })
        )
    }
}