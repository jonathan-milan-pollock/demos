import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class RoverRoverPleaseComeOver implements PhotoOfTheWeek {
  identifier = {
    slug: 'rover-rover-please-come-over',
    group: 2,
  };
  metadata = {
    title: 'Rover Rover Please Come Over',
    description: `Rover is my best customer`,
    keywords: new Set<string>([
      'Englewood',
      'Florida',
      'Rover',
      'Family Store',
      'Family',
      'Happy',
      'Memories',
    ]),
    datePublished: { month: Month.January, day: 27, year: 2020 },
  };
  location = {
    city: 'Englewood',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new RoverRoverPleaseComeOver();
  }
}
