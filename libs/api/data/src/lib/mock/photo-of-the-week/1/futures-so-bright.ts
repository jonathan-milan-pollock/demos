import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class FuturesSoBright extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'futures-so-bright';
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
  dateCreated = new Date(2019, 3, 20).toISOString().substring(0, 10);
  datePublished = new Date(2019, 3, 20).toISOString().substring(0, 10);
  location = {
    city: 'Atlanta',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new FuturesSoBright();
  }
}
