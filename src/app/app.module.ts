import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HeaderComponent,
    AuthComponent,
    HttpClientModule,
    MatDialogModule
    
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
