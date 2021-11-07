import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class RockAndHardPlace extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'rock-and-hard-place';
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
  createdDate = new Date(2019, 7, 5).toISOString().substring(0, 10);
  publishedDate = new Date(2019, 7, 5).toISOString().substring(0, 10);
  location = {
    place: 'Garden of the Gods',
    city: 'Colorado Springs',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new RockAndHardPlace();
  }
}
