import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { sessionModel} from "../../../model/session.model";
import { SessionService} from "../../../_services/session-service";

@Component({
  selector: 'app-all-sessions-view',
  templateUrl: './all-sessions-view.component.html',
  styleUrls: ['./all-sessions-view.component.css']
})


export class AllSessionsViewComponent implements OnInit {

  @Input() sessions!: sessionModel[];
  @Output() signUpClicked = new EventEmitter<void>();

  constructor( private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.fetchTrainingSessions();
  }

  fetchTrainingSessions(): void {
    this.sessionService.fetchAllSessions().subscribe(
      (sessions) => {
        console.log(sessions)
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error fetching training sessions:', error);
      }
    );

  }
}
