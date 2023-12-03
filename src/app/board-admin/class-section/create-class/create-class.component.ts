import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../_services/class.service';
import { TrainerModel } from '../../../model/trainer.model';
import { TrainerServiceService } from '../../../_services/trainer.service.service';
import { NewClassRequest } from '../../../model/new.class.request';
import { atLeastOneTrainerValidator } from './at-least-one-trainer.validator';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})


export class CreateClassComponent implements OnInit {


  createForm!: FormGroup;
  submitted = false;
  trainers: TrainerModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private trainerService: TrainerServiceService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      className: ['', [Validators.required]],
      place: ['', [Validators.required]],
      durationInMinutes: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      trainers: [[], [atLeastOneTrainerValidator]],
    });

    this.fetchAvailableTrainers();
  }

  fetchAvailableTrainers(): void {
    this.trainerService.getTrainers().subscribe(
      (trainers) => {
        this.trainers = trainers;

        // Patch the selected trainers into the form control
        const trainersControl = this.createForm.get('trainers');
        if (trainersControl) {
          const selectedTrainers = trainersControl.value;
          const validSelectedTrainers = selectedTrainers.filter((id: number) =>
            this.trainers.some((trainer) => trainer.id === id)
          );
          trainersControl.patchValue(validSelectedTrainers);
        }
      },
      (error) => {
        console.error('Error fetching available trainers:', error);
      }
    );
  }
  onSubmit(): void {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Do you want to create this class?');

    // If user confirms, proceed with the submission
    if (isConfirmed) {
      this.submitted = true;
      this.createForm.markAllAsTouched(); // Mark all controls as touched

      const request = new NewClassRequest(
        this.createForm.value.className,
        this.createForm.value.place,
        this.createForm.value.durationInMinutes,
        this.createForm.value.description,
        this.createForm.value.category,
        this.createForm.value.trainers
      );

      this.classService.createClass(request).subscribe(
        (response) => {
          console.log('Class created successfully:', response);
          this.submitted = false;
          this.createForm.reset();

          // Display a confirmation message
          alert('Class has been created!');
        },
        (error) => {
          console.error('Error creating class:', error);
          // You can handle error cases here
        }
      );
    }
  }
}
