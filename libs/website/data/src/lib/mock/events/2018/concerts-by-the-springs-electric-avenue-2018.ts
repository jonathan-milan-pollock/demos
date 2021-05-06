import { Event, Month } from '@dark-rush-photography/shared-types';

export class ConcertsByTheSpringsElectricAvenue2018 implements Event {
  slug = 'concerts-by-the-springs-electric-avenue-2018';
  group = 2018;
  title = 'Concerts by the Springs Electric Avenue, 2018';
  description = '';
  keywords = new Set<string>([]);
  dateCreated = { month: Month.October, day: 14, year: 2018 };
  location = {
    place: 'Heritage Sandy Springs',
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new ConcertsByTheSpringsElectricAvenue2018();
  }
}
