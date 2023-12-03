  import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

  export const atLeastOneTrainerValidator: ValidatorFn = (
  control: AbstractControl
  ): ValidationErrors | null => {
  const trainers = control.value as number[];

  return trainers && trainers.length > 0 ? null : { atLeastOneTrainer: true };
  };
