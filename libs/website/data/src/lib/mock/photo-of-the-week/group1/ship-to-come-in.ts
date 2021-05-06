import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class ShipToComeIn implements PhotoOfTheWeek {
  slug = 'ship-to-come-in';
  group = 1;
  title = 'Waiting for my Ship to Come In';
  description = `
    This is at Sarasota Florida's Sarasota Ski A Rees Water Ski Show. 
    It makes me think of Jaws actually! They were performing so to me 
    this photo was an easy shot it wasn't staged, it's just what it is.`;
  keywords = new Set<string>([
    'Northport',
    'Michigan',
    'Adirondack Chairs',
    'Relaxing',
    'Peaceful',
    'Water',
    'Boat',
    'Flowers',
    'Summer',
  ]);
  datePublished = { month: Month.May, day: 12, year: 2019 };
  location = {
    city: 'Northport',
    stateOrProvince: 'Michigan',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new ShipToComeIn();
  }
}
