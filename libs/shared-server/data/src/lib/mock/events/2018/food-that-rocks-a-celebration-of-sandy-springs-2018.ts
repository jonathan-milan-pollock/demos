import {
  Event,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class FoodThatRocksACelebrationOfSandySprings2018 implements Event {
  id = '';
  type: DocumentType = 'Event';
  slug = 'food-that-rocks-a-celebration-of-sandy-springs-2018';
  group = 2018;
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
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];
  threeSixtyImages = [];
  videos = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new FoodThatRocksACelebrationOfSandySprings2018();
  }
}
