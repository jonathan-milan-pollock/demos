import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class ThroughTheLookingGlass implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'through-the-looking-glass';
  group = 2;
  title = 'Through the Looking Glass';
  description = `I enjoy the colors in this photo, as the colors in front of the 
    menu are the same color as the marble.`;
  keywords = [
    'Palm Beach',
    'Florida',
    'Glasses',
    'Menu',
    'Marble',
    'Composition',
  ];
  datePublished = { month: Month.February, day: 22, year: 2020 };
  location = {
    city: 'Palm Beach',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new ThroughTheLookingGlass();
  }
}
