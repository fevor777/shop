import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static isFirstSymbolUppercase({
    value,
  }: AbstractControl<String>): ValidationErrors | null {
    if (
      value != null &&
      value.length > 0 &&
      value[0] !== value[0].toUpperCase()
    ) {
      return {
        isFirstSymbolUppercase: true,
      };
    }
    return null;
  }
}
