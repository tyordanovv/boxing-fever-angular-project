import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { sessionModel} from "../../../model/session.model";
import { SessionService} from "../../../_services/session-service";
import {StorageService} from "../../../_services/storage.service";
import {ConfirmationDialogComponent} from "../../../util/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-all-sessions-view',
  templateUrl: './all-sessions-view.component.html',
  styleUrls: ['./all-sessions-view.component.css']
})


export class AllSessionsViewComponent implements OnInit {

  sessions!: sessionModel[];

  successMessages: { [classId: number]: string } = {};
  private dialog = inject(MatDialog);
  errorMessage = '';
  isAdmin = false;

  constructor( private sessionService: SessionService, private storageService: StorageService) {
    this.isAdmin = this.CheckRole();
  }

  ngOnInit(): void {
    this.fetchTrainingSessions();
  }

  fetchTrainingSessions(): void {
    this.sessionService.fetchAllSessions().subscribe(
      (sessions) => {
        console.log(sessions)
        this.sessions = sessions;
        this.sortData();

      },
      (error) => {
        console.error('Error fetching training sessions:', error);
      }
    );

  }
  sortData() {
    this.sessions = this.sessions
      .sort((a, b) =>
        new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime());
  }
  subscribeToClass(sessionId: number, userID: number ): void {
    this.sessionService.subscribeToClass(sessionId, userID).subscribe(
      () => {
        const sessionToUpdate = this.sessions.find((session) => session.id === sessionId);
        if (sessionToUpdate){
          sessionToUpdate.capacity -= 1;

          // Not implemented in our backend
          //this.sessionService.updateSession(sessionToUpdate.id, sessionToUpdate.capacity)

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
  // Delete currently not working because of a Foreign Key constraint in our backend
  deleteSession(sessionID: number): void {
    this.sessionService.deleteSession(sessionID).subscribe(
      () => {
        this.successMessages[sessionID] = 'Session was deleted successfully.'
        console.log('Session was deleted successfully.')
      },
      (error => {
        this.successMessages[sessionID] = 'Session could not be deleted.'
        console.error(('Session could not be deleted.'))
      })
    )
  }

  confirmDelete(sessionID: number): void {
    const message = 'Are you sure you want to delete this session?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.sessionService.deleteSession(sessionID).subscribe({
          next: data => {
            this.storageService.clean();
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  CheckRole(): boolean {
    if (this.storageService.getUser().role === 'ROLE_ADMIN')
      return true;
    else return false;
  }

}
