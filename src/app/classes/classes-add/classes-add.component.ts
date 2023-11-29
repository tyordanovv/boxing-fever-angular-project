import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewClassRequest } from '../../models/new-class-request';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.component.html',
  styleUrls: ['./classes-add.component.css']
})
export class ClassesAddComponent implements OnInit {
  trainers: string[] = [];
  selectedTrainers: number[] = [];
  newClassRequest: NewClassRequest = {
    className: '',
    description: '',
    durationInMinutes: 0,
    category: TrainingClassEnums.UNSPECIFIED,
    trainers: []
  };

  constructor(private http: HttpClient, private trainerService: TrainerService) { }

  ngOnInit(): void {
    this.getTrainers();
  }

  getTrainers() {
    this.trainerService.getAllTrainers().subscribe((response) => {
      this.trainers = response.map((trainer) => trainer.name);
    });
  }

  onSubmit() {
    this.newClassRequest.trainers = this.selectedTrainers;
    this.http.post<string>('http://localhost:8080/api/v1/class/api/v1/class', this.newClassRequest)
      .subscribe(() => {
        // Success message
        alert('New class created successfully!');
        this.newClassRequest = {
          className: '',
          description: '',
          durationInMinutes: 0,
          category: TrainingClassEnums.UNSPECIFIED,
          trainers: []
        };
        this.selectedTrainers = [];
      }, (error) => {
        // Error message
        alert('Error creating new class:' + error.message);
      });
  }
}
