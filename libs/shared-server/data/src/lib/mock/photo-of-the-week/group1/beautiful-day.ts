import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class BeautifulDay implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'beautiful-day';
  group = 1;
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
  datePublished = { month: Month.June, day: 15, year: 2019 };
  location = { city: 'Sicily', country: 'Italy' };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new BeautifulDay();
  }
}
