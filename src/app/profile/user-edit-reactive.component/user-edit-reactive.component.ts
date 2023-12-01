import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { emailValidator } from 'src/app/util/validators/user-validator';

@Component({
  selector: 'app-user-edit-reactive.component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit-reactive.component.html',
  styleUrls: ['./user-edit-reactive.component.css']
})
export class UserEditReactiveComponent {
  protected user: any;
  isSuccessful = false;
  errorMessage = '';

  form = this.fb.group({
    id: [0],
    firstName: ['', [
      Validators.required, 
      Validators.minLength(2)
    ]],
    lastName: ['', [
      Validators.required, 
      Validators.minLength(2)
    ]],
    email: ['', [
      Validators.required,
      emailValidator()
    ]],
    address: ['', [
      Validators.required, 
      Validators.minLength(2)
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService, 
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser().user

    this.form.patchValue(this.user);
  }

  save(): void {
    const updatedUser = this.form.getRawValue();
    const { id, email, firstName, lastName ,address} = updatedUser;

    this.userService.updateUser(
      id,
      firstName,
      lastName,
      email,
      address
    ).subscribe({
      next: data => {
        console.log('Response from server:', data);
        this.isSuccessful = true;
        
      },
      error: err => {
        console.error('Error from server:', err);
      }
    })
  }
}
