import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class EenyMeenyMinyMoe implements PhotoOfTheWeek {
  identifier = {
    slug: 'eeny-meeny-miny-moe',
    group: 1,
  };
  metadata = {
    title: 'Eeny, Meeny, Miny, Moe',
    description: `
    Which boat is going first?`,
    keywords: new Set<string>([
      'Kowaliga',
      'Lake Martin',
      'Alexander City',
      'Alabama',
      'Speed Boats',
      'Water',
      'Waiting',
    ]),
    datePublished: { month: Month.June, day: 23, year: 2019 },
  };
  location = {
    place: 'Kowaliga, Lake Martin',
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
    return new EenyMeenyMinyMoe();
  }
}
