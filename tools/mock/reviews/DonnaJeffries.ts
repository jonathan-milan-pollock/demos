import { ReviewDto } from '@dark-rush-photography/shared/types';

export class DonnaJeffries extends ReviewDto {
  title = 'Donna Jeffries';
  text = [
    `
    Can not stay enough of how much I love Dark Rush Photography
    Truly unique photos that express what you want to convey.
    She make it look effortless and a whole lot of fun. Would
    recommend her to my family and friends.
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new DonnaJeffries();
  }
}
