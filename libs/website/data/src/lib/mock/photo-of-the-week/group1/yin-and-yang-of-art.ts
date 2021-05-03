import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class YinAndYangOfArt implements PhotoOfTheWeek {
  identifier = {
    slug: 'yin-and-yang-of-art',
    group: 1,
  };
  metadata = {
    title: 'Yin and Yang of Art',
    description: `Graffiti reaches the natural world`,
    keywords: new Set<string>([
      'The Tunnel to Nowhere',
      'Bryson City',
      'North Carolina',
      'Bridge',
      'Nature',
      'Graffiti',
      'Art',
      'Pathway',
      'Beauty',
    ]),
    datePublished: { month: Month.March, day: 28, year: 2019 },
  };
  location = {
    place: 'The Tunnel to Nowhere',
    city: 'Bryson City',
    stateOrProvince: 'North Carolina',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new YinAndYangOfArt();
  }
}
