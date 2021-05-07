import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class FuturesSoBright implements PhotoOfTheWeek {
  id = '';
  slug = 'futures-so-bright';
  group = 1;
  title = 'My Futures So Bright I Gotta Wear Shades';
  description = `
    Literally on top of the mountain top, as high as I could be. I
    was in Bryson City, North Carolina with my parents on their 50th
    wedding anniversary and the mountains are in the background.`;
  keywords = [
    'Atlanta',
    'Georgia',
    'Funny',
    'Guard Dogs',
    'Matching',
    'Shades',
    'Sunglasses',
  ];
  datePublished = { month: Month.March, day: 20, year: 2019 };
  location = {
    city: 'Atlanta',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new FuturesSoBright();
  }
}
