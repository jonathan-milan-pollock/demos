import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { Observable } from 'rxjs';

export class PhotoOfTheWeekValidators {
  static uniqueSlug(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
      new Promise<{ duplicate: boolean }>((resolve) => {
        setTimeout(() => {
          if (control.value == 'aint-no-mountain-high-enough') {
            resolve({ duplicate: true });
          }
        }, 1_500);
      });
  }
}
