import {
  Event,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class ThanksgivingInAlexanderCity2018 implements Event {
  id = '';
  type: DocumentType = 'Event';
  slug = 'thanksgiving-in-alexander-city-2018';
  group = 2018;
  title = `Thanksgiving in Alexander City, 2018`;
  description = `
    It's beginning to look a lot like Christmas
  `;
  keywords = ['Alexander City', 'Georgia', 'Hometown', 'Christmas'];
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `
      It's beginning to look a lot like Christmas
      `,
  ];
  images = [];
  threeSixtyImages = [];
  videos = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new ThanksgivingInAlexanderCity2018();
  }
}
