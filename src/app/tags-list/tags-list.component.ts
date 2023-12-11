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

  constructor(private tagService: TagsListService ) {}

  ngOnInit(){
    this.tags = this.tagService.getTags();
    this.tagChangeSub = this.tagService.tagsChanged.subscribe((tags: Tag[]) => {
      this.tags = tags;
      console.log('My actual tags list:', this.tags);
    })
  } 

  ngOnDestroy() {
    this.tagChangeSub?.unsubscribe();
  }

  openColorPicker() {
    if (this.colorPicker) {
      this.colorPicker.openDialog(); // Open the color picker dialog
    }
  }

  addTag(event: MatChipInputEvent): void {

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
    console.log(value);
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
}
 