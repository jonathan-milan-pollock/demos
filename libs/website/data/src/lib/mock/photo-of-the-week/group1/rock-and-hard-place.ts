import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class RockAndHardPlace implements PhotoOfTheWeek {
  identifier = {
    slug: 'rock-and-hard-place',
    group: 1,
  };
  metadata = {
    title: 'Between a Rock and a Hard Place',
    description: `
    Stuck between a rock and a hard place.`,
    keywords: new Set<string>([
      'Garden of the Gods',
      'Colorado Springs',
      'Colorado',
      'Adventure',
      'Sport',
      'Mountain',
      'Climbing',
      'Stuck',
    ]),
    datePublished: { month: Month.July, day: 5, year: 2019 },
  };
  location = {
    place: 'Garden of the Gods',
    city: 'Colorado Springs',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new RockAndHardPlace();
  }
}
