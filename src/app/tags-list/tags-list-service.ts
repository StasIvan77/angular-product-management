import { Injectable } from "@angular/core";
import { Tag } from "../shared/tag.model";

import { DataStorageService } from "../shared/data-storage.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsListService {
    
    constructor(private  dataStorageService: DataStorageService){
      this.setTags();
      this.tagsUpdated();
      
    }

  public tagsChanged = new Subject<Tag[]>
  private tags: Tag[] = [];

      getTags() {
        return this.tags.slice();
      }  

      getTag(index: number) {
        return this.tags[index];
      } 

      setTags() {
        //
       // return this.dataStorageService.products[0].tags;
      }

      

      tagsUpdated(){
        this.tagsChanged.next(this.tags.slice());
        console.log('Tags Updated!');
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