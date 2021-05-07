import { Review } from '@dark-rush-photography/shared-types';

export class ErikLing implements Review {
  id = '';
  name = 'Erik Ling';
  text = [
    `
    She is wonderful! Hire her! I give her 5 stars.
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new ErikLing();
  }
}
