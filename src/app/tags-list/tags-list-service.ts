import { EventEmitter, Injectable } from "@angular/core";
import { Tag } from "../shared/tag.model";
import { ProductService } from "../products/product.service";


export class TagsListService {
    constructor(){

    }

    public tagsChanged = new EventEmitter<Tag[]>
   private tags: Tag[] = [
        new Tag('Yellow','#FFD700' ),
        new Tag('Green','#00FF00' ),    
      ];

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
            this.tags.push(...tags);
            this.tagsChanged.emit(this.tags.slice());
        
      }
      
}