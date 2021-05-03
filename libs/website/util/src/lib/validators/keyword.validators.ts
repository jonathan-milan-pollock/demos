import { AbstractControl } from '@angular/forms';

export class KeywordValidators {
  static required(keywords: string[]) {
    return (): { empty: boolean } => {
      return { empty: keywords.length > 0 };
    };
  }

  static unique(keywords: string[]) {
    return (control: AbstractControl): { duplicate: boolean } => {
      return { duplicate: keywords.indexOf(control.value) !== -1 };
    };
  }
}
