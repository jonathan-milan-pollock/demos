import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class TreeHouseToEverywhere implements PhotoOfTheWeek {
  identifier = {
    slug: 'tree-house-to-everywhere',
    group: 1,
  };
  metadata = {
    title: 'The Tree House to Everywhere',
    description: `
    My cousin Thomas built this tree house when he was in high
    school. I would sit in the tree house and think how cool it was
    to be at the height of the birds and be in nature. It didn't need
    bells or whistles, it's just all natural, it is what it is.`,
    keywords: new Set<string>([
      'Alexander City',
      'Alabama',
      'Tree House',
      'Childhood',
      'Memories',
      'Stairs',
      'Woods',
      'Birds',
      'Nature',
      'Natural',
    ]),
    datePublished: { month: Month.June, day: 2, year: 2019 },
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
    return new TreeHouseToEverywhere();
  }
}
