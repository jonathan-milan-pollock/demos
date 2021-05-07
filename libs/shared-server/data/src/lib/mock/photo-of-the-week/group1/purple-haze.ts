import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class PurpleHaze implements PhotoOfTheWeek {
  id = '';
  slug = 'purple-haze';
  group = 1;
  title = 'Purple Haze';
  description = `
    This shot is from a Prairie in Wisconsin`;
  keywords = ['Wisconsin', 'Prairie', 'Purple', 'Flowers', 'Yellow'];
  datePublished = { month: Month.June, day: 29, year: 2019 };
  location = { stateOrProvince: 'Wisconsin', country: 'United States' };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new PurpleHaze();
  }
}
