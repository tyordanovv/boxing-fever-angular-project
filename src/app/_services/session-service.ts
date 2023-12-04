import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { sessionModel} from "../model/session.model";

const SESSION_API = 'http://localhost:8080/api/v1/session';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private http: HttpClient) {}

  fetchAllSessions(): Observable<sessionModel[]> {
    return this.http.get<sessionModel[]>(SESSION_API);
  }

  createSession(startHour:string, endHour:string, capacity:number, sessionDate:string, className:string): Observable<any> {
    return this.http.post(
      SESSION_API,
      {
        startHour,
        endHour,
        capacity,
        sessionDate,
        className,
      },
      httpOptions
    );
  }

  // Delete currently not working because of a Foreign Key constraint in our backend
  deleteSession(id: number): Observable<any>{
    const deleteUrl = `${SESSION_API}/${id}`;
    return this.http.delete(deleteUrl);
  }

  subscribeToClass(sessionID: number, userID: number): Observable<void>{
    const MapToUserUrl = `${SESSION_API}/${sessionID}/${userID}`;
    return this.http.post<void>(MapToUserUrl,{})};

  // Not implemented in our Backend
//  updateSession(id: number, capacity:number): Observable<any>{
//  const updateSessionUrl =${SESSION_API} + '/edit';
//  return  this.http.post(updateSessionUrl,
//    {
//      id,
//      capacity,
//    }, httpOptions
//  )
//}
}
