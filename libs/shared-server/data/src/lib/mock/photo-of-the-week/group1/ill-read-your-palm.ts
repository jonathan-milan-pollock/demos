import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class IllReadYourPalm implements PhotoOfTheWeek {
  id = '';
  slug = 'ill-read-your-palm';
  group = 1;
  title = "I'll Read Your Palm";
  description = `
    I'll read your palm if you read mine in front of the palm tree.`;
  keywords = [
    'Jackson Square',
    'New Orleans',
    'Louisiana',
    'Palm Tree',
    'Blue Sky',
    'Manicured Lawn',
    'Landscaping',
  ];
  datePublished = { month: Month.April, day: 4, year: 2019 };
  location = {
    place: 'Jackson Square',
    city: 'New Orleans',
    stateOrProvince: 'Louisiana',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new IllReadYourPalm();
  }
}
