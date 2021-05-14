import { Review, DocumentType } from '@dark-rush-photography/shared-types';

export class RonnieColquitt implements Review {
  id = '';
  type: DocumentType = 'Review';
  title = 'Ronnie Colquitt';
  text = [
    `
    I've been Dark Rush's friend / photography friend for nearly 
    10 years and I've watched her grow professionally ever
    since. Her photos just get better and better each year. She
    has developed a good eye for subject matter, color,
    composition and lighting. She is a very sweet lady as well
    as a talented photographer.
  `,
  ];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new RonnieColquitt();
  }
}
