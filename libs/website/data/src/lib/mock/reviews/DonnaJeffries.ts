import { Review } from '@dark-rush-photography/shared-types';

export class DonnaJeffries implements Review {
  slug = 'donna-jeffries';
  name = 'Donna Jeffries';
  text = [
    `
    Can not stay enough of how much I love Dark Rush Photography
    Truly unique photos that express what you want to convey.
    She make it look effortless and a whole lot of fun. Would 
    recommend her to my family and friends.
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new DonnaJeffries();
  }
}
