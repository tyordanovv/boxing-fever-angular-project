import {Component, inject, Input, OnInit} from '@angular/core';
import { sessionModel} from "../../../model/session.model";
import { SessionService} from "../../../_services/session-service";
import {ConfirmationDialogComponent} from "../../../util/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {StorageService} from "../../../_services/storage.service";


@Component({
  selector: 'app-all-sessions-view',
  templateUrl: './all-sessions-view-admin.component.html',
  styleUrls: ['./all-sessions-view-admin.component.css']
})


export class AllSessionsViewAdminComponent implements OnInit {

  @Input() sessions!: sessionModel[];


  successMessages: { [classId: number]: string } = {};
  private dialog = inject(MatDialog);
  errorMessage = '';

  constructor(
  private sessionService: SessionService,
  private storageService: StorageService)
{
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


  getSuccessMessage(classId: number): string {
    return this.successMessages[classId] || '';
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



}
