// create-class.component.ts

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ClassService } from '../../../_services/class.service';
import { NewClassRequest } from '../../../model/new.class.request';
import { TrainerModel } from '../../../model/trainer.model';
import { TrainerServiceService } from '../../../_services/trainer.service.service';

function atLeastOneTrainer(control: AbstractControl): ValidationErrors | null {
  const trainers = control.value as TrainerModel[];
  return trainers && trainers.length > 0 ? null : { atLeastOneTrainer: true };
}

export function requiredValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.trim() === '' ? { required: true } : null;
}

export function customPlaceValidator(control: AbstractControl): ValidationErrors | null {
  const place = control.value?.trim();
  return place === '' ? { place: 'Please enter a place.' } : null;
}



@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  createForm: FormGroup = this.formBuilder.group({
    className: ['', [Validators.required]],
    place: ['', [Validators.required]],
    durationInMinutes: [0, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    trainers: this.formBuilder.array([]),
  }, { validators: atLeastOneTrainer });

  submitted = false;
  trainers: TrainerModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService,
    private trainerService: TrainerServiceService
  ) { }

  ngOnInit(): void {
    this.fetchAvailableTrainers();
  }

  fetchAvailableTrainers(): void {
    this.trainerService.getTrainers().subscribe(
      (trainers) => {
        this.trainers = trainers;
        this.createForm.patchValue({ trainers });
      },
      (error) => {
        console.error('Error fetching available trainers:', error);
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const request = new NewClassRequest(
      this.createForm.value.className,
      this.createForm.value.place,
      this.createForm.value.durationInMinutes,
      this.createForm.value.description,
      this.createForm.value.category,
      this.createForm.value.trainers.map((trainer: TrainerModel) => trainer.id)
    );

    this.classService.createClass(request).subscribe(
      (response) => {
        console.log('Class created successfully:', response);
        this.submitted = false;
        this.createForm.reset();
      },
      (error) => {
        console.error('Error creating class:', error);
      }
    );
  }
}
