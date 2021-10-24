import { EventDto } from '@dark-rush-photography/shared/types';

export class SandySpringsFestival2017 extends EventDto {
  group = 2017;
  slug = 'sandy-springs-festival-2017';
  title = 'Sandy Springs Festival, 2017';
  description = `
    You could sense the excitement at the 2017 Sandy
    Springs Festival for the Grand Opening of City Springs.
  `;
  keywords = [
    'Sandy Springs',
    'Georgia',
    'Sandy Springs Festival',
    'New City Springs',
    'Chalk Art',
    'Local Friends',
  ];
  createdDate = new Date(2018, 1, 7).toISOString().substring(0, 10);
  publishedDate = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;
  text = [
    `
      You could sense the excitement at the 2017 Sandy
      Springs Festival for the Grand Opening of City Springs.
      I enjoyed the chalk art and seeing local friends.
      `,
  ];
  images = [];
  videos = [];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new SandySpringsFestival2017();
  }
}
