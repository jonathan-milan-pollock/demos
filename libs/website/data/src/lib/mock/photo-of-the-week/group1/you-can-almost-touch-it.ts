import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class YouCanAlmostTouchIt implements PhotoOfTheWeek {
  identifier = {
    slug: 'you-can-almost-touch-it',
    group: 1,
  };
  metadata = {
    title: 'You Can Almost Touch It!',
    description: `I'm at a restaurant eating in Mexico City, Mexico. This is what I really saw.`,
    keywords: new Set<string>([
      'Mexico City',
      'Mexico',
      'Unbelievable View',
      'Restaurant',
      'Majestic',
      'Fancy',
      'Palace',
    ]),
    datePublished: { month: Month.April, day: 25, year: 2019 },
  };
  location = { city: 'Mexico City', country: 'United States' };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new YouCanAlmostTouchIt();
  }
}
