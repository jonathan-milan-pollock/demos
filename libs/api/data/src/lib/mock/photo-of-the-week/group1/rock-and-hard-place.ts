import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class RockAndHardPlace extends PhotoOfTheWeekDto {
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
  dateCreated = new Date(2019, 7, 5).toISOString().substring(0, 10);
  datePublished = new Date(2019, 7, 5).toISOString().substring(0, 10);
  location = {
    place: 'Garden of the Gods',
    city: 'Colorado Springs',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new RockAndHardPlace();
  }
}
