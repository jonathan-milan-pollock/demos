import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class SarasotaSharkDancers extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'sarasota-shark-dancers';
  title = 'Sarasota Shark Dancers';
  description = `
    This is at Sarasota Florida's Sarasota Ski A Rees Water Ski Show.
    It makes me think of Jaws actually! They were performing so to me
    this photo was an easy shot it wasn't staged, it's just what it is.`;
  keywords = [
    'Sarasota Ski A Rees Ski Show',
    'Sarasota',
    'Florida',
    'Ski Show',
    'Water',
    'Speed Boat',
    'Acrobatics',
    'Vacation',
    'Jaws',
  ];
  dateCreated = new Date(2019, 7, 12).toISOString().substring(0, 10);
  datePublished = new Date(2019, 7, 12).toISOString().substring(0, 10);
  location = {
    place: 'Sarasota Ski A Rees Ski Show',
    city: 'Sarasota',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new SarasotaSharkDancers();
  }
}
