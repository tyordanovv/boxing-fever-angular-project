import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../_services/class.service';
import { NewClassRequest } from '../models/new-class-request';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      className: ['', [Validators.required]],
      place: ['', [Validators.required]],
      durationInMinutes: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      trainers: [[]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const request: NewClassRequest = {
      className: this.createForm.value.className,
      place: this.createForm.value.place,
      durationInMinutes: this.createForm.value.durationInMinutes,
      description: this.createForm.value.description,
      category: this.createForm.value.category,
      trainers: this.createForm.value.trainers
    };

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
