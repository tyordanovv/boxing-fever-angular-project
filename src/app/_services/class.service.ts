import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewClassRequest } from './models/new-class-request';
import { TrainingClass } from './models/training-class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  getClasses(): Observable<TrainingClass[]> {
    return this.http.get<TrainingClass[]>(`${environment.apiUrl}/all-training-classes`);
  }

  getClass(id: number): Observable<TrainingClass> {
    return this.http.get<TrainingClass>(`${environment.apiUrl}/classes/${id}`);
  }

  createClass(request: NewClassRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/classes`, request);
  }
}
