import { Event, Month } from '@dark-rush-photography/shared-types';

export class TasteOfAtlanta2018 implements Event {
  identifier = {
    slug: 'taste-of-atlanta-2018',
    group: 2018,
  };
  metadata = {
    title: 'Taste of Atlanta 2018',
    description: ``,
    keywords: new Set<string>([]),
    dateCreated: { month: Month.October, day: 14, year: 2018 },
  };
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {
    text: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new TasteOfAtlanta2018();
  }
}
