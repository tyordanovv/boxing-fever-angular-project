import { CommonModule, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session-service';// Update the path
import { createSessionRequst } from 'src/app/model/create.session.request';
import { timeOrderValidator } from 'src/app/util/validators/time.validator';
import {TrainingClass} from "../../../model/training.class";
import {TrainerModel} from "../../../model/trainer.model";

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
  classes: TrainingClass[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  form = this.fb.group({

    startHour: [null, Validators.required],
    endHour: [null, Validators.required],
    capacity: [null, Validators.required,],
    sessionDate: [null, Validators.required],
    className: ["", Validators.required]

  }, {validator: timeOrderValidator('startHour', 'endHour')});

  private loadClasses(): void {
    const classesUrl = 'http://localhost:8080/api/v1/class/all';

    this.http.get<TrainingClass[]>(classesUrl).subscribe({
      next: data  => {
        this.classes = data;
      },
      error: err => {
        console.error('Error fetching classes', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const sessionRequest = this.form.value as createSessionRequst;

      sessionRequest.startHour = this.formatDateTime(sessionRequest.sessionDate, sessionRequest.startHour);
      sessionRequest.endHour = this.formatDateTime(sessionRequest.sessionDate, sessionRequest.endHour);

      this.sessionService.createSession(
        sessionRequest.startHour,
        sessionRequest.endHour,
        sessionRequest.capacity,
        sessionRequest.sessionDate,
        sessionRequest.className).subscribe({
        next: (data: any) => {
          console.log('Response from server:', data);
          this.isSuccessful = true;
        },
        error: (err: any) => {
          console.error('Error from server:', err);
          this.errorMessage = err.error.message;
        }
      })
    }
  }

  private formatDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }
}
