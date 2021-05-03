import { Event, Month } from '@dark-rush-photography/shared-types';

export class SandySpringsFestival2018 implements Event {
  identifier = {
    slug: 'sandy-springs-festival-2018',
    group: 2018,
  };
  metadata = {
    title: 'Sandy Springs Festival, 2018',
    description: `
  `,
    keywords: new Set<string>([]),
    dateCreated: { month: Month.October, day: 14, year: 2018 },
  };
  location = {
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
    return new SandySpringsFestival2018();
  }
}
