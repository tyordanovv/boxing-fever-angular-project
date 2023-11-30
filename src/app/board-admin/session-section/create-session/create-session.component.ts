import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session-service';// Update the path
import { createSessionRequst } from 'src/app/model/create.session.request';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit{
  isSuccessful = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService 
  ) {}

  form = this.fb.group({
    startHour: [
      null, 
      Validators.required
    ],
    endHour: [
      null,
      Validators.required
    ],
    capacity: [
      [0], 
      Validators.required
    ],
    sessionDate: [
      null, 
      Validators.required
    ],
    className: [
      '', 
      Validators.required
    ],
  });

  ngOnInit(): void {
    // You can perform any initialization logic here if needed
  }

  onSubmit() {
    if (this.form.valid) {
      const sessionRequest = this.form.value as unknown as createSessionRequst;
      console.log(sessionRequest)

    //   this.sessionService.createSession(sessionRequest).subscribe({
    //     next: (data: any) => {
    //       console.log('Response from server:', data);
    //       console.log('Session created successfully', data);
    //       this.isSuccessful = true;
    //     },
    //     error: (err: any) => {
    //       console.error('Error creating session', err);
    //       this.errorMessage = 'Error creating session. Please try again.'; // You can customize the error message
    //     }
    //   });
    }
  }
}
