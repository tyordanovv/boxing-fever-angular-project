import {Component, Input} from '@angular/core';
import {SessionService} from "../../_services/session-service";

@Component({
  selector: 'app-session-section-admin',
  templateUrl: './session-section-admin.component.html',
  styleUrls: ['./session-section-admin.component.css']
})
export class SessionSectionAdminComponent {
  @Input() title: string = 'Session-Section';
  @Input() content: string = '';


  constructor(private sessionService: SessionService) {

  }

}
