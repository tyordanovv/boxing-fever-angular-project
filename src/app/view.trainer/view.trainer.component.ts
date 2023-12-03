import { Component, OnInit, inject, Input } from '@angular/core';
import { TrainerServiceService } from '../_services/trainer.service.service';
import { MatDialog,  } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';
import { TrainerModel } from '../model/trainer.model';

@Component({
  selector: 'app-view.trainer',
  templateUrl: './view.trainer.component.html',
  styleUrls: ['./view.trainer.component.css']
})
export class ViewTrainerComponent implements OnInit{
  trainer: any;
  private dialog = inject(MatDialog);
  errorMessage = '';

  @Input()
  trainers!: TrainerModel[];

  constructor( 
    private trainerService: TrainerServiceService,
  ) {}

  ngOnInit(): void {
    this.getAllTrainerInfo();
  }

  getAllTrainerInfo(): void {
    this.trainerService.getTrainers().subscribe(
      (trainers) => {
      console.log(trainers)
      this.trainers = trainers;
      },
      (error) => {
        console.error('Error fetching trainers:', error);
      }
    );
  }

  confirmDelete(trainerId: number): void {
    const message = 'Are you sure you want to delete the trainer?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: message 
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.trainerService.deleteTrainer(trainerId).subscribe({
          next: data => {
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
