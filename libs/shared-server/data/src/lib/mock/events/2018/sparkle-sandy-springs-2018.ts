import {
  Event,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class SparkleSandySprings2018 implements Event {
  id = '';
  type: DocumentType = 'Event';
  slug = 'sparkle-sandy-springs-2018';
  group = 2018;
  title = 'Sandy Springs Festival, 2018';
  description = '';
  keywords = [];
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    place: 'Heritage Sandy Springs',
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
    return new SparkleSandySprings2018();
  }
}
