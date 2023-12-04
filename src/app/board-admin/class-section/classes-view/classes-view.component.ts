import { Component, Input, OnInit, inject } from '@angular/core';
import { ClassService } from '../../../_services/class.service';
import { TrainingClass } from '../../../model/training.class';
import { TrainerModel } from '../../../model/trainer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../../util/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classes-view',
  templateUrl: './classes-view.component.html',
  styleUrls: ['./classes-view.component.css']
})
export class ClassesViewComponent implements OnInit {

  @Input() classes: TrainingClass[] = [];
  @Input() selectedTrainer: TrainerModel | null = null;

  constructor(private classService: ClassService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchClasses();
  }

  private fetchClasses(): void {
    this.classService.getClasses().subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        this.displayErrorMessage('Error fetching classes: ' + error.message);
      }
    );
  }

  openTrainerDetails(trainer: TrainerModel): void {
    // Implement logic to display trainer details 
    this.selectedTrainer = trainer;
    console.log('Trainer details:', trainer);
  }

  deleteClass(classID: number): void {
    const confirmationMessage = 'Are you sure you want to delete this class?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationMessage
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.classService.deleteClass(classID).subscribe({
          next: () => {
            this.fetchClasses();
            this.displaySuccessMessage('Class was deleted successfully.');
          },
          error: (error) => {
            this.displayErrorMessage('Error deleting class: ' + error.message);
          }
        });
      }
    });
  }

  displayErrorMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Error', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }

  displaySuccessMessage(successMessage: string): void {
    this.snackBar.open(successMessage, 'Success', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });
  }
}
