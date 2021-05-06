import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class FlowersInTheMist implements PhotoOfTheWeek {
  slug = 'flowers-in-the-mist';
  group = 1;
  title = 'Flowers in the Mist';
  description = `
    Literally on top of the mountain top, as high as I could be. I
    was in Bryson City, North Carolina with my parents on their 50th
    wedding anniversary and the mountains are in the background.`;
  keywords = new Set<string>([
    'Bryson City',
    'North Carolina',
    'Mountain Top',
    'Misty',
    'Wild Flowers',
    'Mountains',
  ]);
  datePublished = { month: Month.June, day: 8, year: 2019 };
  location = {
    city: 'Bryson City',
    stateOrProvince: 'North Carolina',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new FlowersInTheMist();
  }
}
