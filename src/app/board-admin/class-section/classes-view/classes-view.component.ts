import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../_services/class.service';
import { TrainingClass } from '../../../model/training.class';
import { TrainerModel } from '../../../model/trainer.model';

@Component({
  selector: 'app-classes-view',
  templateUrl: './classes-view.component.html',
  styleUrls: ['./classes-view.component.css']
})
export class ClassesViewComponent implements OnInit {

  classes: TrainingClass[] = [];
  trainerInfo: { [trainerId: number]: TrainerModel } = {};
  showTrainerDetails: { [trainerId: number]: boolean } = {};

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.fetchClasses();
  }

  private fetchClasses(): void {
    this.classService.getClasses().subscribe(
      (response) => {
        this.classes = response;

        // Retrieve trainer information for each training class
        for (let trainingClass of this.classes) {
          for (let trainerId of trainingClass.trainers) {
            this.fetchTrainerInfo(trainerId);
          }
        }
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  private fetchTrainerInfo(trainerId: number): void {
    this.classService.getTrainer(trainerId).subscribe(
      (response) => {
        this.trainerInfo[trainerId] = response;
      },
      (error) => {
        console.error('Error fetching trainer info:', error);
      }
    );
  }

  // Toggle trainer details visibility
  toggleTrainerDetails(trainerId: number): void {
    this.showTrainerDetails[trainerId] = !this.showTrainerDetails[trainerId];
  }
}
