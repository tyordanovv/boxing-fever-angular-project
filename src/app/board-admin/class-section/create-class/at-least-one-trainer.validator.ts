import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOneTrainerValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const trainers = control.value as number[];
  if (!trainers || trainers.length === 0) {
    return { atLeastOneTrainer: true };
  }

  return null;
};
