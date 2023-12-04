import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewClassRequest } from '../model/new.class.request';
import { TrainingClass } from '../model/training.class';
import { TrainerModel } from '../model/trainer.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/class/';
  private readonly baseUrlTrainer = 'http://localhost:8080/api/v1/trainer/';
 

  constructor(private http: HttpClient) { }

  getClasses(): Observable<TrainingClass[]> {
    return this.http.get<TrainingClass[]>(`${this.baseUrl}all`, httpOptions);
  }

  createClass(request: NewClassRequest): Observable<string> {
    return this.http.post<string>(  // Provide the type parameter for post
      `${this.baseUrl}`,
      request,
      httpOptions
    );
  }

  deleteClass(id: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}${id}`;
    return this.http.delete(deleteUrl);
  }
}

