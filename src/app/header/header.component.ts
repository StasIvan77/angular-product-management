import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthComponent } from '../auth/auth/auth.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../shared/data-storage.service';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { Tag } from '../shared/tag.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  @Input() products: Product[] = [];

  isAuthenticated = false;
  private userSub!: Subscription;


  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private productService: ProductService){

  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeProducts();
  }

  onFetchProducts(){
    this.dataStorageService.fetchProducts().subscribe();
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }


  manageAllTags(){

    this.products.map(product =>  product.tags.forEach(tag => {
      console.log(`  Tag Name: ${tag.name}, Color: ${tag.colorTag}`);
  }));
    
   
   // console.log('My all tags: ', tagsFromProducts);
   
     // this.productService.addAllTagsToTagsManager(tagsFromProducts);
    }
}
