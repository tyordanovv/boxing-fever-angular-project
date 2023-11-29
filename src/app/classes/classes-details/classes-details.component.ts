import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TrainingClassDto } from '../../models/training-class-dto';

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.css']
})
export class ClassesDetailsComponent implements OnInit {
  trainingClass: TrainingClassDto | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const classId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.fetchClassDetails(classId);
  }

  fetchClassDetails(classId: number) {
    this.http.get<TrainingClassDto>(`http://localhost:8080/api/v1/class/api/v1/class/${classId}`)
      .subscribe((response) => {
        this.trainingClass = response;
      });
  }
}
