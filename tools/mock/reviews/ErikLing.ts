import { ReviewDto } from '@dark-rush-photography/shared/types';

export class ErikLing extends ReviewDto {
  title = 'Erik Ling';
  text = [
    `
    She is wonderful! Hire her! I give her 5 stars.
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new ErikLing();
  }
}
