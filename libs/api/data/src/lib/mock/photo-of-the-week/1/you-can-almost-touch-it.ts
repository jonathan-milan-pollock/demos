import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class YouCanAlmostTouchIt extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'you-can-almost-touch-it';
  title = 'You Can Almost Touch It!';
  description = `I'm at a restaurant eating in Mexico City, Mexico. This is what I really saw.`;
  keywords = [
    'Mexico City',
    'Mexico',
    'Unbelievable View',
    'Restaurant',
    'Majestic',
    'Fancy',
    'Palace',
  ];
  dateCreated = new Date(2019, 4, 25).toISOString().substring(0, 10);
  datePublished = new Date(2019, 4, 25).toISOString().substring(0, 10);
  location = { city: 'Mexico City', country: 'United States' };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new YouCanAlmostTouchIt();
  }
}
