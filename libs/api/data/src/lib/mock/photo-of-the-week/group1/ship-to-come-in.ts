import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class ShipToComeIn extends PhotoOfTheWeekDto {
  slug = 'ship-to-come-in';
  group = 1;
  title = 'Waiting for my Ship to Come In';
  description = `
    This is at Sarasota Florida's Sarasota Ski A Rees Water Ski Show. 
    It makes me think of Jaws actually! They were performing so to me 
    this photo was an easy shot it wasn't staged, it's just what it is.`;
  keywords = [
    'Northport',
    'Michigan',
    'Adirondack Chairs',
    'Relaxing',
    'Peaceful',
    'Water',
    'Boat',
    'Flowers',
    'Summer',
  ];
  dateCreated = new Date(2019, 5, 12).toISOString().substring(0, 10);
  datePublished = new Date(2019, 5, 12).toISOString().substring(0, 10);
  location = {
    city: 'Northport',
    stateOrProvince: 'Michigan',
    country: 'United States',
  };
  useTitleImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new ShipToComeIn();
  }
}
