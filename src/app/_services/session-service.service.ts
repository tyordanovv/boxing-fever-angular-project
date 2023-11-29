import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { sessionModel} from "../model/session.model";

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private apiUrl = 'http://localhost:8080/api/v1/session/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  fetchData(): Observable<sessionModel> {
    return this.http.get<sessionModel>(this.apiUrl);
  }
}
