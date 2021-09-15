import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class BeautifulDay extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'beautiful-day';
  title = "It's a Beautiful Day";
  description = "It's a Beautiful Day";
  keywords = [
    'Sicily',
    'Italy',
    'Beach',
    'Blue Water',
    'Mountain',
    'Beach Homes',
    'Swimming',
    'Blue Sky',
    'Puffy Clouds',
  ];
  dateCreated = new Date(2019, 6, 15).toISOString().substring(0, 10);
  datePublished = new Date(2019, 6, 15).toISOString().substring(0, 10);
  location = { city: 'Sicily', country: 'Italy' };
  photoAlbumImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new BeautifulDay();
  }
}
