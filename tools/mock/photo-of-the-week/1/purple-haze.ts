import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class PurpleHaze extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'purple-haze';
  title = 'Purple Haze';
  description = `
    This shot is from a Prairie in Wisconsin`;
  keywords = ['Wisconsin', 'Prairie', 'Purple', 'Flowers', 'Yellow'];
  createdDate = new Date(2019, 6, 29).toISOString().substring(0, 10);
  publishedDate = new Date(2019, 6, 29).toISOString().substring(0, 10);
  location = { stateOrProvince: 'Wisconsin', country: 'United States' };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new PurpleHaze();
  }
}
