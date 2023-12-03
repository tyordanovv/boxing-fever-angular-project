
export interface sessionModel {
  id: number;
  className: string;
  capacity: number;
  startHour: Date;
  endHour: Date;
  sessionDate: Date;
  trainees: number[];
  trainers: number[];
}

