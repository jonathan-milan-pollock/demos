import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class StopForTexts extends PhotoOfTheWeekDto {
  slug = 'stop-for-texts';
  group = 2;
  title = 'Stop for Texts';
  description = `I should really stop to read my texts!`;
  keywords = ['Venice', 'Italy', 'Text', 'Cell Phone', 'Vespa', 'Modeling'];
  dateCreated = new Date(2020, 3, 8).toISOString().substring(0, 10);
  datePublished = new Date(2020, 3, 8).toISOString().substring(0, 10);
  location = { city: 'Venice', country: 'Italy' };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new StopForTexts();
  }
}
