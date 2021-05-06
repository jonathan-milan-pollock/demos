import { Review } from '@dark-rush-photography/shared-types';

export class BrianWalkabout implements Review {
  slug = 'brian-walkabout';
  name = 'Brian Walkabout';
  text = [
    `
    Dark has a keen since of noticing eye catching subject matter as well as composition and 
    framing of a subject. She is also a very open and flexible person in regards to traveling 
    to various locations for photo shoots. She is also good at understanding what her
    customer's needs are and their perceived vision for a photo. Dark would be an excellent 
    photographer for your photo needs!
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new BrianWalkabout();
  }
}
