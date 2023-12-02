import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainerServiceService } from '../_services/trainer.service.service';

@Component({
  selector: 'app-edit.trainer',
  templateUrl: './edit.trainer.component.html',
  styleUrls: ['./edit.trainer.component.css'],
})
export class EditTrainerComponent implements OnInit{
  form: any = {
    name: null,
    email: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private trainerService: TrainerServiceService,
    ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void{
    const { name, email} = this.form;
  
    this.trainerService.registerTrainer(name, email).subscribe({
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
