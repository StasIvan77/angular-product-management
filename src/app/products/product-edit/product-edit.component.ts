import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Product } from '../product.model';
import { TagsListService } from 'src/app/tags-list/tags-list-service';
import { TagsListComponent } from 'src/app/tags-list/tags-list.component';
import { ColorPickerDirective, ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule,
    CommonModule, 
    MatCardModule,
    MatChipsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TagsListComponent,
    ColorPickerModule,
    FormsModule

  ]
})
export class ProductEditComponent {
  @ViewChild(ColorPickerDirective) colorPicker: ColorPickerDirective | undefined;

  id: number = 0;
  editMode = false;
  productForm: FormGroup;
  selectedProduct?: Product;

  constructor(private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private fb: FormBuilder
    ) {
      this.productForm = this.fb.group({
        name: '',
        description: '',
        imagePath: '',
        price: ''
        
      })
    }


  ngOnInit() {
    let productById: Product | undefined;
    
    const pId = this.route.snapshot.paramMap.get('productId')
    console.log("selected producst id:", pId);

    //product ID check
    if(pId) {
      productById = this.dataStorageService.getProductById(parseInt(pId));
    }
    this.selectedProduct = productById;   

    this.route.params.subscribe((params: Params) => {
      this.id = +params['productId'];
      this.editMode = params['productId'] != null;
      this.initForm(this.selectedProduct);
      console.log(this.editMode);      
    });


    //eddint controls to reactive forms
    if (this.selectedProduct && this.selectedProduct.tags) {
      this.selectedProduct.tags.forEach(tag => {
        this.productForm.addControl(tag.name, this.fb.control(tag.name));
        //this.productForm.addControl(tag.colorTag, this.fb.control(tag.colorTag));
        //this.userInputColor = tag.colorTag;
      });
    }
  }

  onSubmit() {
    console.log(this.productForm);
  }

  //Треба тут добавити функції що добавляють новий рядок з майбутніми тегами
  onAddProduct() {
    //this.productForm
  }

  private initForm(product: Product | undefined) {
    this.productForm = this.fb.group({
      'name': [product?.name],
      'description': [product?.description],
      'imagePath': [product?.imagePath],
      'price': [product?.price],
      'tags': [product?.tags]
    });
  }

  openColorPicker() {
    if (this.colorPicker) {
      this.colorPicker.openDialog(); // Open the color picker dialog
    }
  }
}
