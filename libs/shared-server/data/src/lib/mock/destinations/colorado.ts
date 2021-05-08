import {
  Destination,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class Colorado implements Destination {
  id = '';
  type: DocumentType = 'Destination';
  slug = 'colorado';
  title = 'Colorado';
  description = `
      An Extended Reality (XR) experience Colorado presented by Dark Rush Photography
  `;
  keywords = ['Colorado', 'Mountains', 'Beautiful'];
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = ['Please welcome me to Colorado so I can discover you'];
  images = [];
  threeSixtyImages = [];
  videos = [];
  socialMedia = [];
  destinations = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Destination {
    return new Colorado();
  }
}
