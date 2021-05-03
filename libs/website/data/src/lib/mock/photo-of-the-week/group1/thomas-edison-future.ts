import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class ThomasEdisonFuture implements PhotoOfTheWeek {
  identifier = {
    slug: 'thomas-edison-future',
    group: 1,
  };
  metadata = {
    title: 'Thomas Edison in the Future',
    description: `
    This is at Stone Mountain, Georgia at the Country Living Magazine
    Fair. I love the coils and the reflection of the sky and feel" "Edison would be very proud if he saw this photo.`,
    keywords: new Set<string>([
      'Country Living Magazine Fair',
      'Stone Mountain',
      'Georgia',
      'Coils',
      'Thomas Edison',
      'Edison Light Bulb',
      'Warmth',
      'Reflection',
    ]),
    datePublished: { month: Month.April, day: 18, year: 2019 },
  };
  location = {
    place: 'Country Living Magazine Fair',
    city: 'Stone Mountain',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new ThomasEdisonFuture();
  }
}
