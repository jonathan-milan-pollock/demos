import { Event, Month } from '@dark-rush-photography/shared-types';

export class ThanksgivingInAlexanderCity2018 implements Event {
  slug = 'thanksgiving-in-alexander-city-2018';
  group = 2018;
  title = `Thanksgiving in Alexander City, 2018`;
  description = `
    It's beginning to look a lot like Christmas
  `;
  keywords = new Set<string>([
    'Alexander City',
    'Georgia',
    'Hometown',
    'Christmas',
  ]);
  dateCreated = { month: Month.November, day: 11, year: 2018 };
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `
      It's beginning to look a lot like Christmas
      `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new ThanksgivingInAlexanderCity2018();
  }
}
