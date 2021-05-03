import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class YouAlreadyAreHome implements PhotoOfTheWeek {
  identifier = {
    slug: 'you-already-are-home',
    group: 1,
  };
  metadata = {
    title: 'You Already are Home',
    description: `This reminds me of the movie Almost Famous when the boy says, 'I
    have to go home' and the response is 'You Already are Home' as
    Tiny Dancer plays in the background. My parents and I were in the
    Smoky Mountains when we met the couple that owned this beetle. A" "railroad is also in the background. I think this is the coolest
    picture ever and one of my all-time favorites I've taken.`,
    keywords: new Set<string>([
      'Great Smoky Mountains',
      'Camping',
      'Scenic',
      'Memories',
      'Railroad',
      'VW Classic Bus',
      'Almost Famous',
      'Outdoors',
    ]),
    datePublished: { month: Month.April, day: 12, year: 2019 },
  };
  location = { place: 'Great Smoky Mountains', country: 'United States' };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new YouAlreadyAreHome();
  }
}
