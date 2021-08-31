import { EventDto } from '@dark-rush-photography/api/types';

export class ConcertsByTheSpringsElectricAvenue2018 extends EventDto {
  group = 2018;
  slug = 'concerts-by-the-springs-electric-avenue-2018';
  title = 'Concerts by the Springs Electric Avenue, 2018';
  description = '';
  keywords = [];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Heritage Sandy Springs',
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new ConcertsByTheSpringsElectricAvenue2018();
  }
}
