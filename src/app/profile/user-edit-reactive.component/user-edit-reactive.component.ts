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
    userEmail: ['', [
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

    this.form.valueChanges.subscribe((userForm) => {
      console.log('user form changed:', userForm);
    });
  }

  save(): void {
    const updatedUser = this.form.getRawValue();
    const { id, userEmail, firstName, lastName ,address} = updatedUser;

    console.log(id)
    console.log(userEmail)
    console.log(firstName)
    console.log(lastName)
    console.log(address)

    this.userService.updateUser(
      id,
      firstName,
      lastName,
      userEmail,
      address
    ).subscribe({
      next: (data: any) => {
        console.log('Response from server:', data);
        this.isSuccessful = true;
      },
      error: (err: any) => {
        console.error('Error from server:', err);
      }
    })
    console.log('Updated user:', updatedUser);
  }
}
