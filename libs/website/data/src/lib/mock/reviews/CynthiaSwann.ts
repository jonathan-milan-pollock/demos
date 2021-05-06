import { Review } from '@dark-rush-photography/shared-types';

export class CynthiaSwann implements Review {
  slug = 'cynthia-swann';
  name = 'Cynthia Swann';
  text = [
    `
    Dark is a very talented professional. She captured the 
    personalities of our guests and conveyed the enjoyment of 
    our Christmas party. She made everyone feel at ease because 
    she is such an outgoing person and everyone was so pleased 
    with her photographs.
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new CynthiaSwann();
  }
}
