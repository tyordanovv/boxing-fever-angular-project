import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewClassRequest } from '/model/new-class-request';
import { TrainingClass } from '/model/training-class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/class';
  private readonly baseUrlTrainer = 'http://localhost:8080/api/v1/trainer';
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getClasses(): Observable<TrainingClass[]> {
    return this.http.get<TrainingClass[]>(`${this.baseUrl}/all-training-classes`, httpOptions);
  }

  createClass(request: NewClassRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, request), httpOptions;
  }

  getTrainer(id: string): Observable<any> {
    return this.http.get(
      this.baseUrlTrainer + id, httpOptions);
  }
}

