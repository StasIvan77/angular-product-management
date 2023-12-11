import { Injectable } from "@angular/core";
import { Tag } from "../shared/tag.model";

import { DataStorageService } from "../shared/data-storage.service";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsListService {
  private tagChangeSub?: Subscription;
  public tagsChanged = new Subject<Tag[]>
  private tags: Tag[] = [];
  
    constructor(private  dataStorageService: DataStorageService){
      

      this.tagChangeSub = this.tagsChanged.subscribe((tags: Tag[]) => {
        tags = this.tags;      
    })
      this.tagsUpdated();
      
    }



      getTags() {
        return this.tags.slice();
      }  

      getTag(index: number) {
        return this.tags[index];
      } 

      setTags() {
        const allTags: { name: string; colorTag: string }[] = this.dataStorageService.products
  .map(product => product.tags) // Extract tags array for each product
  .flat() // Flatten the array of arrays into a single array
  .filter(tag => tag.name && tag.colorTag); // Filter out tags without name or colorTag properties
      }

      

      tagsUpdated(){
        this.tagsChanged.next(this.tags.slice());
      }

      addTags(tags: Tag[]) {       
        
        console.log('Before push', this.tags.slice());
            this.tags = [];
            this.tags.push(...tags);
            this.tagsChanged.next(this.tags.slice());            
            console.log('Tags Updated via AddTags!');
            console.log(this.tags.slice());
        
      }

      
      
}