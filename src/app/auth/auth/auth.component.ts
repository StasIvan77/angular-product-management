import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, AuthResponseData } from './auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule   
  ]
})
export class AuthComponent {
  isLoginMode = true;
  error: string | null = null;
  

  constructor(private authService: AuthService){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  
  //email and password logic
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

  onSubmit(form: NgForm) {
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }  

    authObs.subscribe(
      resData => {
        console.log(resData);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    
    form.reset();
  } 
  
}




