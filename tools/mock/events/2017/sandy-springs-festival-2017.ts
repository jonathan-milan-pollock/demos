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
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTileImage = false;
  text = [
    `
      You could sense the excitement at the 2017 Sandy
      Springs Festival for the Grand Opening of City Springs. 
      I enjoyed the chalk art and seeing local friends.
      `,
  ];
  images = [];
  threeSixtyImages = [];
  videos = [];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new SandySpringsFestival2017();
  }
}
