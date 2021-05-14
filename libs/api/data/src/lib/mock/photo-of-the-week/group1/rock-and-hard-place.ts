import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class RockAndHardPlace implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'rock-and-hard-place';
  group = 1;
  title = 'Between a Rock and a Hard Place';
  description = 'Stuck between a rock and a hard place.';
  keywords = [
    'Garden of the Gods',
    'Colorado Springs',
    'Colorado',
    'Adventure',
    'Sport',
    'Mountain',
    'Climbing',
    'Stuck',
  ];
  datePublished = { month: Month.July, day: 5, year: 2019 };
  location = {
    place: 'Garden of the Gods',
    city: 'Colorado Springs',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new RockAndHardPlace();
  }
}
