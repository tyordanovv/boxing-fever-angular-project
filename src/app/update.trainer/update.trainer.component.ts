import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainerServiceService } from '../_services/trainer.service.service';
import { TrainerModel } from '../model/trainer.model';

@Component({
  selector: 'app-update.trainer',
  templateUrl: './update.trainer.component.html',
  styleUrls: ['./update.trainer.component.css']
})
export class UpdateTrainerComponent {
  form: any = {
    id: null,
    name: null,
    email: null
  };
  isSuccessful = false;
  errorMessage = '';

  @Input()
  trainers!: TrainerModel[];
  id: any;

  constructor(
    private trainerService: TrainerServiceService,
    ) { }
  
  ngOnInit(): void {
    this.getAllTrainerInfo();
  }

  getAllTrainerInfo(): void {
    this.trainerService.getTrainers().subscribe(
      (trainers) => {
      console.log(trainers)
      this.trainers = trainers;
      },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  onSubmit(): void{
    const { id, name, email} = this.form;
  
    this.trainerService.updateTrainer(id, name, email).subscribe({
      next: (data: any) => {
        console.log('Response from server:', data);
        this.isSuccessful = true;
      },
      error: (err: any) => {
        console.error('Error from server:', err);
        this.errorMessage = err.error.message;
      }
    });
  }
}
