import { EventDto } from '@dark-rush-photography/shared/types';

export class FoodThatRocksACelebrationOfSandySprings2018 extends EventDto {
  group = 2018;
  slug = 'food-that-rocks-a-celebration-of-sandy-springs-2018';
  title = 'Food that Rocks A Celebration of Sandy Springs 2018';
  description = '';
  keywords = [
    'Sandy Springs',
    'Georgia',
    'Atlanta Rhythm Section (ARS)',
    'Performance',
    'Heritage Sandy Springs',
    'Amazing Concert',
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new FoodThatRocksACelebrationOfSandySprings2018();
  }
}
