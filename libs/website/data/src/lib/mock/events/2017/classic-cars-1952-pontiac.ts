import { Event, Month } from '@dark-rush-photography/shared-types';

export class ClassicCars1952Pontiac implements Event {
  slug = 'classic-cars-1952-pontiac';
  group = 2017;
  title = 'Classic 1952 Pontiac';
  description = `
    Over the holiday, my photographer friends and I went
    out to capture photos around Goodwater, Alabama.
  `;
  keywords = new Set<string>([
    'Goodwater',
    'Alabama',
    'Classic',
    '1952 Pontiac',
    'Car',
  ]);
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    city: 'Goodwater',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `Over the holiday, my photographer friends and I went
      out to capture photos around Goodwater, Alabama.  On
      the side of the road was this classic 1952 Pontiac.
      While we heard them in their backyard shooting
      something (perhaps squirrel), we were in front
      "shooting" their car!`,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new ClassicCars1952Pontiac();
  }
}
