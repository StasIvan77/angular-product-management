import { EventEmitter, Injectable } from "@angular/core";
import { Tag } from "../shared/tag.model";
import { ProductService } from "../products/product.service";
import { TagsListComponent } from "./tags-list.component";


export class TagsListService {
    
    constructor(){

    }

    public tagsChanged = new EventEmitter<Tag[]>
   private tags: Tag[] = [];

      getTags() {
        return this.tags.slice();
      }  

      tagsUpdated(){
        this.tagsChanged.emit(this.tags.slice());
        console.log('Tags Updated!');
      }

      addTags(tags: Tag[]) {
        // let products =  this.productService.getProducts();
        // for (let tag of tags ) {
        // }
        console.log('Before push', this.tags.slice());
            this.tags = [];
            this.tags.push(...tags);
            this.tagsChanged.emit(this.tags.slice());            
            console.log('Tags Updated via AddTags!');
            console.log(this.tags.slice());
           //this.tagsListComponent.formControl.setValue(this.tags.map(tags => tags.name));
        
      }

      
      
}