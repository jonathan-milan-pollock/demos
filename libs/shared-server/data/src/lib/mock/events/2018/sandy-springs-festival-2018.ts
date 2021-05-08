import {
  Event,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class SandySpringsFestival2018 implements Event {
  id = '';
  type: DocumentType = 'Event';
  slug = 'sandy-springs-festival-2018';
  group = 2018;
  title = 'Sandy Springs Festival, 2018';
  description = '';
  keywords = [];
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
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
    return new SandySpringsFestival2018();
  }
}
