import { Review } from '@dark-rush-photography/shared-types';

export class ErikLing implements Review {
  identifier = {
    slug: 'erik-ling',
  };
  meta = {
    title: 'Erik Ling',
    description: `
    She is wonderful! Hire her! I give her 5 stars.
    `,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new ErikLing();
  }
}
