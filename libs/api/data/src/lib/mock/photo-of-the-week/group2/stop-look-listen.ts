import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class StopLookListen implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'stop-look-listen';
  group = 2;
  title = 'Stop, Look, and Listen';
  description = `I should really stop to read my texts!`;
  keywords = [
    'Buena Vista',
    'Colorado',
    'Mountains',
    'Snow',
    'Railroad Crossing',
    'Cold Temperature',
    'Puffy Clouds',
  ];
  datePublished = { month: Month.January, day: 4, year: 2020 };
  location = {
    city: 'Buena Vista',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new StopLookListen();
  }
}
