import { Event, Month } from '@dark-rush-photography/shared-types';

export class FoodThatRocksACelebrationOfSandySprings2018 implements Event {
  slug = 'food-that-rocks-a-celebration-of-sandy-springs-2018';
  group = 2018;
  title = 'Food that Rocks A Celebration of Sandy Springs 2018';
  description = '';
  keywords = new Set<string>([
    'Sandy Springs',
    'Georgia',
    'Atlanta Rhythm Section (ARS)',
    'Performance',
    'Heritage Sandy Springs',
    'Amazing Concert',
  ]);
  dateCreated = { month: Month.October, day: 14, year: 2018 };
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new FoodThatRocksACelebrationOfSandySprings2018();
  }
}
