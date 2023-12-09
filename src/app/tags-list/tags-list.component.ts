import {Component, EventEmitter, Output, ViewChild, inject} from '@angular/core';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
    MatIconModule,    
    ReactiveFormsModule,
    
    
  ],
  providers: []
})
export class TagsListComponent {
  @ViewChild(ColorPickerDirective) colorPicker: ColorPickerDirective | undefined;
  @Output() tagAdded = new EventEmitter<Event> ();

  formControl = new FormControl();
  userInputValue: string = '';
  userInputColor: string = '#ffffff';

  tags: Tag[] = [];

  constructor(private tagService: TagsListService ) {

  }

  ngOnInit(){
    this.tags = this.tagService.getTags();
    this.tagService.tagsChanged.subscribe((tags: Tag[]) => {
      tags = this.tags;
      console.log('My actual tags list:', this.tags);
    })
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  announcer = inject(LiveAnnouncer);

  openColorPicker() {
    if (this.colorPicker) {
      this.colorPicker.openDialog(); // Open the color picker dialog
    }
  }
  addTag(event: MatChipInputEvent): void {
    //this.openColorPicker();
    const value = this.userInputValue !== null && this.userInputValue !== undefined ?  event.value : 'New Tag';
    console.log(event.value);
    if (value != '') {
     event.chipInput!.clear();
    } 
    if (this.userInputColor == ''){
      this.userInputColor = '#ffffff';
    }
    
      // Add our keyword
      console.log('color:'+ this.userInputColor);
      console.log('value:'+ value);
        if(value == '') {
          event.chipInput!.clear();
        } else {
          
          this.tags.push(new Tag(value, this.userInputColor));
          this.tagService.tagsUpdated();
          // It's updating tags without this:
          // const newTag = new Tag(value, this.userInputColor);
          // //this.tagAdded.emit(newTag);
          // this.onTagAdded(event);
          // console.log('newTag' + newTag.name);
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

      this.announcer.announce(`Removed ${tag}`);
    }    
  }


    //є баг з кольорами коли апдейтити
   edit(tag: Tag, event: MatChipEditedEvent) {
    

    const value = event.value.trim();
    
    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeChip(tag);
      return;
    }
    
    // Edit existing tag    
    const index = this.tags.indexOf(tag);
    console.log(value);
    if (index >= 0) {
      if( this.userInputColor == '' || this.userInputColor == '#ffffff'){
        this.userInputColor = this.tags[index].colorTag;
      } else 
      {
        
      }
         this.formControl.setValue(this.tags[index].name = value);
         this.formControl.setValue(this.tags[index].colorTag = this.userInputColor);
    }
    this.userInputColor = ''; // Clear the input field after adding
    this.userInputValue = ''; 
  }


 

  colorSelected(color: string): void {
    this.userInputColor = color;
  }

  // No need for this
  // onTagAdded(event: MatChipInputEvent){
  //   console.log('Event type:', typeof event);
  //     //this.tags.push(event);
  //     console.log(this.tags);
  // }
  

  

  // Logic for a tags
  // addOnBlur = true;
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  // announcer = inject(LiveAnnouncer);

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push({name: value});
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  // remove(fruit: Fruit): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);

  //     this.announcer.announce(`Removed ${fruit}`);
  //   }
  // }

  // edit(fruit: Fruit, event: MatChipEditedEvent) {
  //   const value = event.value.trim();

  //   // Remove fruit if it no longer has a name
  //   if (!value) {
  //     this.remove(fruit);
  //     return;
  //   }

  //   // Edit existing fruit
  //   const index = this.fruits.indexOf(fruit);
  //   if (index >= 0) {
  //     this.fruits[index].name = value;
  //   }
  // }


  //FIRST SOLUTION
  // userInputColor = '';
  // userInputValue: string = '';  





  // keywords: { name: string; color: string }[] = [
  //   { name: 'Keyword1', color: 'red' },
  //   { name: 'Keyword2', color: 'blue' },
  //   // ... other keywords
  // ];  formControl = new FormControl(['angular']);

  // announcer = inject(LiveAnnouncer);
  
  // removeKeyword(index: number): void {
  //   this.keywords.splice(index, 1);
  //   this.formControl.setValue(this.keywords.map(keyword => keyword.name)); // Update the form control value
  // }
  // add(event?: MatChipInputEvent): void {
    
    
  //   const value = this.userInputValue !== null && this.userInputValue !== undefined ? this.userInputValue : 'New Tag';

  //   // Add our keyword
  //   let color = this.userInputColor;
  
  //     if(value == '') {
  //       this.keywords.push({ name: 'New Tag', color: color });

  //     } else {
  //       this.keywords.push({ name: value, color: color });

  //     }
  //     // Add the new keyword to the array
  //     console.log(value);
  //     console.log(color);
      

  //     this.formControl.setValue(this.keywords.map(keyword => keyword.name)); // Update the form control value
  //     this.userInputColor = ''; // Clear the input field after adding
  //     this.userInputValue = '';      
    

  //   // Clear the input value
  //   if (event) {
  //     event.chipInput!.clear();
  //      }
  //   }
  
  
}
