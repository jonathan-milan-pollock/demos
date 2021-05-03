import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class BeautifulDay implements PhotoOfTheWeek {
  identifier = {
    slug: 'beautiful-day',
    group: 1,
  };
  metadata = {
    title: "It's a Beautiful Day",
    keywords: new Set<string>([
      'Sicily',
      'Italy',
      'Beach',
      'Blue Water',
      'Mountain',
      'Beach Homes',
      'Swimming',
      'Blue Sky',
      'Puffy Clouds',
    ]),
    datePublished: { month: Month.June, day: 15, year: 2019 },
  };
  location = { city: 'Sicily', country: 'Italy' };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new BeautifulDay();
  }
}
