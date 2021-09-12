import { ReviewDto } from '@dark-rush-photography/shared/types';

export class BrianWalkabout extends ReviewDto {
  title = 'Brian Walkabout';
  text = [
    `
    Dark has a keen since of noticing eye catching subject matter as well as composition and
    framing of a subject. She is also a very open and flexible person in regards to traveling
    to various locations for photo shoots. She is also good at understanding what her
    customer's needs are and their perceived vision for a photo. Dark would be an excellent
    photographer for your photo needs!
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new BrianWalkabout();
  }
}
