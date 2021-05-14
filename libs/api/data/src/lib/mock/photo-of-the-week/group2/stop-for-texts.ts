import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class StopForTexts implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'stop-for-texts';
  group = 2;
  title = 'Stop for Texts';
  description = `I should really stop to read my texts!`;
  keywords = ['Venice', 'Italy', 'Text', 'Cell Phone', 'Vespa', 'Modeling'];
  datePublished = { month: Month.March, day: 8, year: 2020 };
  location = { city: 'Venice', country: 'Italy' };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new StopForTexts();
  }
}
