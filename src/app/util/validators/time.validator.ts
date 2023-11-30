import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeOrderValidator(startHourControlName: string, endHourControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startHour = control.get(startHourControlName)?.value;
    const endHour = control.get(endHourControlName)?.value;

    if (startHour && endHour && startHour >= endHour) {
      return { timeOrder: true };
    }

    return null;
  };
}