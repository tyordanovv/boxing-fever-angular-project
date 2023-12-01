
export class NewClassRequest {
  private className: string;
  private place: string;
  private durationInMinutes: number;
  private description: string;
  private category: string;
  private trainers: string[];

  // Assuming you have a constructor
  constructor(className: string, place: string, durationInMinutes: number, description: string, category: string, trainers: string[]) {
    this.className = className;
    this.place = place;
    this.durationInMinutes = durationInMinutes;
    this.description = description;
    this.category = category;
    this.trainers = trainers;
  }

  // Other methods or properties...
}
