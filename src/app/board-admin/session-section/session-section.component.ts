import { Component, Input } from '@angular/core';
import { SessionServiceService} from "../../_services/session-service.service";
import {sessionModel} from "../../model/session.model";



@Component({
  selector: 'app-session-section',
  templateUrl: './session-section.component.html',
  styleUrls: ['./session-section.component.css']
})
export class SessionSectionComponent {
  @Input() title: string = 'Session-Section';
  @Input() content: string = '';

  sessions: sessionModel =
    {capacity: 1, sessionDate: new Date(2000,12,12), className: 'a',
    endHour: new Date(2000,12,12),
    startHour: new Date(2000,12,12), trainees: [1,2,3], trainers: [1,2,3]} as sessionModel;



  constructor(private sessionService: SessionServiceService) {

  }

  onButtonClick(buttonText: string) {
    alert(`${buttonText} clicked!`);
  }

  onButtonSeeAllClick(buttonText: string) {
    this.sessionService.fetchData().subscribe(value => {
      this.sessions = value;
    });
    alert(this.sessions);
  }
}


