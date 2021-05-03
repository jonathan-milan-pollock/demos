import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class LeafInWaiting implements PhotoOfTheWeek {
  identifier = {
    slug: 'leaf-in-waiting',
    group: 2,
  };
  metadata = {
    title: 'Leaf in Waiting',
    description: `I'm a leaf waiting for you`,
    keywords: new Set<string>([
      'Alexander City',
      'Alabama',
      'Maple Leaf',
      'Colorful',
    ]),
    datePublished: { month: Month.March, day: 21, year: 2020 },
  };
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new LeafInWaiting();
  }
}
