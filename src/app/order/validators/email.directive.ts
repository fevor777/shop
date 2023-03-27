import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator {
  validate({ value }: AbstractControl): ValidationErrors | null {
    let emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+/;
    if (value != null && value.length > 0 && !emailRegexp.test(value)) {
      return {
        appEmailValidator: true,
      };
    }
    return null;
  }
}
