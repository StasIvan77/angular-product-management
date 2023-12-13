import { Injectable, Input, OnDestroy } from "@angular/core";
import { Tag } from "../shared/tag.model";

import { DataStorageService } from "../shared/data-storage.service";
import { Subject, Subscription } from "rxjs";
import { Product } from "../products/product.model";
import { ProductService } from "../products/product.service";

@Injectable({
  providedIn: 'root'
})
export class TagsListService implements OnDestroy{
  private productsSubscription: Subscription;
  private tagChangeSub?: Subscription;
  public tagsChanged = new Subject<Tag[]>
  private tags: Tag[] = [];
  private products: Product[] = [];
  private tagsFromProducts: Tag[] = [];
    constructor(private  dataStorageService: DataStorageService){     

      this.productsSubscription = this.dataStorageService.products$.subscribe((products: Product[] ) => {
        console.log('Products in Tag service:', products);
        this.products = products
      });

      this.tags = this.products.flatMap(product => product.tags);
      console.log(this.tags);

     // this.tagsFromProducts= this.products.map(product => product.tags[0]);
      this.manageAllTags();

      this.tagChangeSub = this.tagsChanged.subscribe((tags: Tag[]) => {
        tags = this.tags;      
    })
      this.tagsUpdated();
      
    }



      getTags() {
        console.log('my tags from getTags:', this.tags.slice());
        
        return this.tags.slice();
      }  

      getTag(index: number) {
        return this.tags[index];
      } 

      setTags() {
  //       const allTags: { name: string; colorTag: string }[] = this.products
  // .map(product => product.tags) // Extract tags array for each product
  // .flat() // Flatten the array of arrays into a single array
  // .filter(tag => tag.name && tag.colorTag); // Filter out tags without name or colorTag properties
      }

      

      tagsUpdated(){
        this.tagsChanged.next(this.tags.slice());
      }
    

      manageAllTags(){
    
 
        this.tags = this.getTags();
       // console.log('Check before adding',this.tags);
        this.tags.forEach(tag => {
         // console.log('Current tag:', tag);
        
          if (tag === undefined || tag === null) {
           // console.log('Skipping undefined or null tag');
            return;
          }
        
          let existingTag = this.tagsFromProducts.find((t: Tag) => t.name === tag.name);
        
          if (!existingTag) {
           // console.log('Adding new tag:', tag);
            this.tagsFromProducts.push(new Tag(tag.name, tag.colorTag));
          } else {
            //console.log('Tag already exists:', tag);
          }
        });
        console.log('My tags after add', this.tagsFromProducts)


         this.tags = [];
         this.tags.push(...this.tagsFromProducts);
         this.tagsChanged.next(this.tags.slice());            
        console.log('Tags Updated via AddTags!',  this.tagsChanged);
        console.log(this.tags.slice());
        }


        ngOnDestroy() {
          // Unsubscribe to avoid memory leaks
          this.productsSubscription.unsubscribe();
        }
      
      
}