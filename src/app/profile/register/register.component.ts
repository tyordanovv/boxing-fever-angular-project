import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    firstname: null,
    lastname: null,
    address: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { firstname, lastname, address, email, password } = this.form;
  
    this.authService.register(firstname, lastname, address, email, password).subscribe({
      next: (data: any) => {
        console.log('Response from server:', data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err: any) => {
        console.error('Error from server:', err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
