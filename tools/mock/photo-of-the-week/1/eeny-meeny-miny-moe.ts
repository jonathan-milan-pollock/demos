import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class EenyMeenyMinyMoe extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'eeny-meeny-miny-moe';
  title = 'Eeny, Meeny, Miny, Moe';
  description = `Which boat is going first?`;
  keywords = [
    'Kowaliga',
    'Lake Martin',
    'Alexander City',
    'Alabama',
    'Speed Boats',
    'Water',
    'Waiting',
  ];
  dateCreated = new Date(2019, 6, 23).toISOString().substring(0, 10);
  datePublished = new Date(2019, 6, 23).toISOString().substring(0, 10);
  location = {
    place: 'Kowaliga, Lake Martin',
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new EenyMeenyMinyMoe();
  }
}
