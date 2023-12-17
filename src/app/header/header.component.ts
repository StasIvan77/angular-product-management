import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthComponent } from '../auth/auth/auth.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from '../products/product.model';


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


  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private router: Router){

  }
  
  isActive(route: string): boolean {
    return this.router.isActive(route, false); // Set the 'exact' parameter to 'false'
  }
  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeProducts(this.products);
  }

  onFetchProducts(){
        this.dataStorageService.fetchProducts().subscribe();
   // this.dataStorageService.fetchProducts();
    //console.log(this.products)
    this.router.navigate(['/']);
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }


  
}
