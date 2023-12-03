import { Component, Input } from '@angular/core';
import { SessionService} from "../../_services/session-service";
import {sessionModel} from "../../model/session.model";
import {StorageService} from "../../_services/storage.service";



@Component({
  selector: 'app-session-section',
  templateUrl: './session-section.component.html',
  styleUrls: ['./session-section.component.css']
})
export class SessionSectionComponent {
  @Input() title: string = 'Session-Section';
  @Input() content: string = '';

  isAdmin = false;


  constructor(private sessionService: SessionService, private storageService: StorageService) {
    this.isAdmin = this.CheckRole();
  }

  CheckRole(): boolean {
    if (this.storageService.getUser().role === 'ROLE_ADMIN')
      return true;
    else return false;
  }
}


