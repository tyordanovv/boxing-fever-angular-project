import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../_services/class.service';
import { TrainerModel } from '../../../model/trainer.model';
import { TrainerServiceService } from '../../../_services/trainer.service.service';
import { NewClassRequest } from '../../../model/new.class.request';
import { atLeastOneTrainerValidator } from './at-least-one-trainer.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
    private trainerService: TrainerServiceService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      className: ['', [Validators.required]],
      place: ['', [Validators.required]],
      durationInMinutes: [0, [Validators.required, Validators.min(20)]],
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

    // If the user confirms, proceed with the submission
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
        (response: any) => {
          console.log('Class created successfully:', response);

          // Check if the response is truthy (exists)
          if (response) {
            // Handle the success case for an HTTP response
            this.snackBar.open('Class has been created!', 'Success', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          } else {
            // Handle other cases if needed
            console.warn('Unexpected response:', response);
          }

          this.submitted = false;
          this.createForm.reset();
        },
        (error) => {
          console.error('Error creating class:', error);

         
          if (error instanceof HttpErrorResponse) {
       
            this.displayErrorMessage(`Error creating class. Status: ${error.status}. Message: ${error.error}`);
          } else {
            this.displayErrorMessage('An unexpected error occurred.');
          }
        }
      );
    }
  }
  displayErrorMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Error', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
  shouldDisplayError(controlName: string): boolean {
    const control = this.createForm.get(controlName);
    if (control) {
      return (control && (control.touched || this.submitted)) && control.invalid;
    }
    return false;
  }

}
