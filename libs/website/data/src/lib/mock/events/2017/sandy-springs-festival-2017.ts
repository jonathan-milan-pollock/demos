import { Event, Month } from '@dark-rush-photography/shared-types';

export class SandySpringsFestival2017 implements Event {
  slug = 'sandy-springs-festival-2017';
  group = 2017;
  title = 'Sandy Springs Festival, 2017';
  description = `
    You could sense the excitement at the 2017 Sandy
    Springs Festival for the Grand Opening of City Springs.
  `;
  keywords = new Set<string>([
    'Sandy Springs',
    'Georgia',
    'Sandy Springs Festival',
    'New City Springs',
    'Chalk Art',
    'Local Friends',
  ]);
  dateCreated = { month: Month.September, day: 23, year: 2017 };

  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `
      You could sense the excitement at the 2017 Sandy
      Springs Festival for the Grand Opening of City Springs. 
      I enjoyed the chalk art and seeing local friends.
      `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new SandySpringsFestival2017();
  }
}
