import { TrainerModel } from "./trainer.model";

export interface TrainingClass {
  id: number;
  className: string;
  place: string;
  durationInMinutes: number;
  description: string;
  category: string;
  trainers: TrainerModel[];
}
