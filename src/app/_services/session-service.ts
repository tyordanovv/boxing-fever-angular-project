import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { sessionModel} from "../model/session.model";
import { createSessionRequst } from '../model/create.session.request'

const SESSION_API = 'http://localhost:8080/api/v1/session/'; // Replace with your API endpoint

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private http: HttpClient) {}

  fetchAllSessions(): Observable<sessionModel> {
    return this.http.get<sessionModel>(SESSION_API);
  }


  // createSession(startHour: Date | null, endHour: Date | null, capacity: number | null, sessionDate: Date | null, className: string | null): Observable<any> {
  createSession(sessionRequest: createSessionRequst): Observable<any> {
    return this.http.post(
      SESSION_API, 
      {
        sessionRequest
      },
      httpOptions
    );
  }
}
