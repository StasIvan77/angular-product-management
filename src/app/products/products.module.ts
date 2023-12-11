import {NgModule} from '@angular/core';
import { ProductService } from './product.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ProductEditComponent } from './product-edit/product-edit.component';


@NgModule({    
      

  declarations: [
    ProductEditComponent
  ]
})
export class ProductModule {
}