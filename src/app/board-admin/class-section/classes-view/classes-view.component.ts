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
  selectedTrainer: TrainerModel | null = null;

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.fetchClasses();
  }

  private fetchClasses(): void {
    this.classService.getClasses().subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  openTrainerDetails(trainer: TrainerModel): void {
    // Implement logic to display trainer details (modal or tooltip)
    this.selectedTrainer = trainer;
    console.log('Trainer details:', trainer);
  }
}
