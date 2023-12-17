import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import { CommonModule } from '@angular/common';
import { ColorPickerDirective, ColorPickerModule } from 'ngx-color-picker';
import { Tag } from '../shared/tag.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { TagsListService } from './tags-list-service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    ColorPickerModule,
    MatFormFieldModule,
    MatChipsModule,      
    ReactiveFormsModule,
    RouterModule, 
    
  ]

})

export class TagsListComponent implements OnInit, OnDestroy {
  @ViewChild(ColorPickerDirective) colorPicker: ColorPickerDirective | undefined;
  @Output() tagAdded = new EventEmitter<Event> ();

  formControl = new FormControl();
  userInputValue: string = '';
  userInputColor: string = '#ffffff';

  tags: Tag[] = [];
  private tagChangeSub?: Subscription;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  announcer = inject(LiveAnnouncer);

  constructor(private tagService: TagsListService ) {
    this.tags = this.tagService.getTags();
  }


  ngOnInit(){
      this.tagChangeSub = this.tagService.tagsChanged.subscribe((tags: Tag[]) => {
        tags = this.tags;  
        console.log("tags", tags);    
    })   
  } 

 

  openColorPicker() {
    if (this.colorPicker) {
      this.colorPicker.openDialog(); // Open the color picker dialog
    }
  }
// перенести весь функціонал редагування тегів у новий компонент tags-edit і викликати блоком за допомогою селектора компонента,
// пізніше коли буду редаговувати компоненти в product-details щоб міг повторно викликати цей компонент із масивов тегів відповідного product
  addTag(event: MatChipInputEvent): void {

    const value = this.userInputValue !== null && this.userInputValue !== undefined ?  event.value : 'New Tag';    
    if (value != '') {
     event.chipInput!.clear();
    } 
    if (this.userInputColor == ''){
      this.userInputColor = '#ffffff';
    }
    
      // Add our keyword      
        if(value == '') {
          event.chipInput!.clear();
        } else {          
          this.tags.push(new Tag(value, this.userInputColor));
          this.tagService.tagsUpdated(this.tags);          
        }        
        
        this.formControl.setValue(this.tags.map(tags => tags.name)); // Update the form control value
        this.userInputColor = ''; // Clear the input field after adding
        this.userInputValue = '';  
  
      // Clear the input value
      if (event) {
        event.chipInput!.clear();
         }  
  }

  removeChip(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagService.tagsUpdated(this.tags);
      this.announcer.announce(`Removed ${tag}`);
    }    

  }
    //
   edit(tag: Tag, event: MatChipEditedEvent) {    

    const value = event.value.trim();
    
    // Remove chip if it no longer has a name
    if (!value) {
      this.removeChip(tag);
      return;
    }
    
    // Edit existing tag    
    const index = this.tags.indexOf(tag);
    //console.log(value);
    if (index >= 0) {
      if( this.userInputColor == '' || this.userInputColor == '#ffffff'){
        this.userInputColor = this.tags[index].colorTag;
        } else 
               {  }
         this.formControl.setValue(this.tags[index].name = value);
         this.formControl.setValue(this.tags[index].colorTag = this.userInputColor);
    }
    this.userInputColor = '#ffffff'; // Clear the input field after adding
    this.userInputValue = ''; 
  }

  colorSelected(color: string): void {
    this.userInputColor = color;
  }
  
  ngOnDestroy() {
    this.tagChangeSub?.unsubscribe();
  }

  addAllTagsToTagsManager(){
    this.tagService.manageAllTags()
    //console.log('Show my products', this.tagService.products);
   // this.dataStorageService.products.forEach(myTags => { tags.push(...myTags.tags) } );
   // console.log('My imported tags', tags);
    //this.tagService.addTags(tags);      
  }
}
 