import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:8080/api/v1/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(id: string): Observable<any> {
    return this.http.get(
      API_URL + id, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(
      API_URL + 'all', httpOptions
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(
      API_URL + id, httpOptions);
  }

  updateUser(id: number | null, firstName: string | null, lastName: string | null, address:string | null, email: string | null): Observable<any>{
    return this.http.post(
      API_URL + 'edit',
      {
        id,
        firstName,
        lastName,
        email,
        address
      },
      httpOptions
    )
  }
}
