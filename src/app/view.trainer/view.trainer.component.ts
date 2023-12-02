import { Component, OnInit, inject } from '@angular/core';
import { TrainerServiceService } from '../_services/trainer.service.service';
import { MatDialog,  } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view.trainer',
  templateUrl: './view.trainer.component.html',
  styleUrls: ['./view.trainer.component.css']
})
export class ViewTrainerComponent {
  trainer: any;
  private dialog = inject(MatDialog);
  errorMessage = '';

  constructor( 
    private trainerService: TrainerServiceService,
  ) {}

  private getAllTrainerInfo(trainerId: number): void {
    this.trainerService.getAllTrainers().subscribe({
      next: data => {
        this.trainer = data
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    }

    );
  }

  confirmDelete(): void {
    const message = 'Are you sure you want to delete the trainer?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message 
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const trainerId = this.trainer.id;

        this.trainerService.deleteTrainer(trainerId).subscribe({
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
