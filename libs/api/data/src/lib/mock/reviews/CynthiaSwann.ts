import { ReviewDto } from '@dark-rush-photography/api/types';

export class CynthiaSwann extends ReviewDto {
  title = 'Cynthia Swann';
  text = [
    `
    Dark is a very talented professional. She captured the 
    personalities of our guests and conveyed the enjoyment of 
    our Christmas party. She made everyone feel at ease because 
    she is such an outgoing person and everyone was so pleased 
    with her photographs.
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new CynthiaSwann();
  }
}
