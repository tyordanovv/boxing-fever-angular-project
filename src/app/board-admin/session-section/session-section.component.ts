import { Component, Input } from '@angular/core';
import { SessionService} from "../../_services/session-service";
import {sessionModel} from "../../model/session.model";



@Component({
  selector: 'app-session-section',
  templateUrl: './session-section.component.html',
  styleUrls: ['./session-section.component.css']
})
export class SessionSectionComponent {
  @Input() title: string = 'Session-Section';
  @Input() content: string = '';


  constructor(private sessionService: SessionService) {

  }

  onButtonClick(buttonText: string) {
    alert(`${buttonText} clicked!`);
  }
}


