import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsEditComponent } from './tags-list/tags-edit/tags-edit.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const appRoutes: Routes =[
  { path: 'authentication', component: AuthComponent } 
];

@NgModule({
  declarations: [
    AppComponent
    
       
    
         
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HeaderComponent,
    AuthComponent,
    HttpClientModule,
    MatDialogModule,
    ProductListComponent,
    ProductsComponent,
    RouterModule.forRoot(appRoutes),
    ProductDetailComponent,
    TagsListComponent,
    TagsEditComponent,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
