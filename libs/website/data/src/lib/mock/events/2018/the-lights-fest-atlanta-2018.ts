import { Event, Month } from '@dark-rush-photography/shared-types';

export class TheLightsFestAtlanta2018 implements Event {
  identifier = {
    slug: 'the-lights-fest-atlanta-2018',
    group: 2018,
  };
  metadata = {
    title: 'The Lights Fest Atlanta 2018',
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
    return new TheLightsFestAtlanta2018();
  }
}
