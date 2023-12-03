import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TrainerServiceService } from '../_services/trainer.service.service';
import { MatDialog,  } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/util/confirmation-dialog/confirmation-dialog.component';
import { TrainerModel } from '../model/trainer.model';

@Component({
  selector: 'app-view.trainer',
  templateUrl: './view.trainer.component.html',
  styleUrls: ['./view.trainer.component.css']
})
export class ViewTrainerComponent {
  trainers: TrainerModel[] = [];
  errorMessage = '';

  constructor(private trainerService: TrainerServiceService) { }

  ngOnInit(): void {
    this.fetchTrainers();
  }

  private fetchTrainers(): void {
    this.trainerService.getTrainers().subscribe({
      next: data => {
        this.trainers = data;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }


  reloadPage(): void {
    window.location.reload();
  }
}
