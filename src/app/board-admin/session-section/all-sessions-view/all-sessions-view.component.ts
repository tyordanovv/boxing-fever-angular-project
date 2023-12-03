import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { sessionModel} from "../../../model/session.model";
import { SessionService} from "../../../_services/session-service";
import {StorageService} from "../../../_services/storage.service";

@Component({
  selector: 'app-all-sessions-view',
  templateUrl: './all-sessions-view.component.html',
  styleUrls: ['./all-sessions-view.component.css']
})


export class AllSessionsViewComponent implements OnInit {

  @Input() sessions!: sessionModel[];
  @Output() signUpClicked = new EventEmitter<void>();

  successMessages: { [classId: number]: string } = {};

  constructor( private sessionService: SessionService, private storageService: StorageService) {
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
  subscribeToClass(sessionId: number, userID: number ): void {
    this.sessionService.subscribeToClass(sessionId, userID).subscribe(
      () => {
        const sessionToUpdate = this.sessions.find((session) => session.id === sessionId);
        if (sessionToUpdate){
          sessionToUpdate.capacity -= 1;
        }
        this.successMessages[sessionId] = 'Subscribed to class successfully.'
        console.log('Subscribed to class successfully.');

      },
      (error) => {
        this.successMessages[sessionId] = 'Could not subscribe to class.'
        console.error('Error subscribing to class:', error);
      }
    );
  }

  getSuccessMessage(classId: number): string {
    return this.successMessages[classId] || '';
  }
  getUserID(): number {
    if (this.storageService.isLoggedIn()) {
      return this.storageService.getUser().user.id;
  } else {
      return -1;
    }
}

}
