import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const API_TRAINER = 'http://localhost:8080/api/v1/trainer/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceService {
  constructor(private http: HttpClient) {}

  getTrainerProfile(id: string): Observable<any> {
    return this.http.get(
      API_TRAINER + id, httpOptions);
  }

  getTrainers(): Observable<any> {
    return this.http.get(
      API_TRAINER + 'all', httpOptions
    );
  }

  deleteTrainer(id: number): Observable<any> {
    return this.http.delete(
      API_TRAINER + id, httpOptions);
  }

  createTrainer(name: string, email: string): Observable<any> {
    return this.http.post(
      API_TRAINER,
      {
        name,
        email,
      },
      httpOptions
    );
  }
}
