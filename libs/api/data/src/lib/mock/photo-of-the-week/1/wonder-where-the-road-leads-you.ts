import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class WonderWhereTheRoadLeadsYou extends PhotoOfTheWeekDto {
  slug = 'wonder-where-the-road-leads-you';
  group = 1;
  title = 'Wonder Where the Road Leads You, I Wonder Where the Road Leads Me';
  description = `
    This is the bridge at Myakka River State Park near Sarasota. It
    is a straight path and it takes you somewhere, but don't know
    where. It is another enigma.`;
  keywords = [
    'Myakka River State Park',
    'Sarasota',
    'Florida',
    'Bridge',
    'Road to Somewhere',
    'Woods',
    'Nature',
    'Outdoors',
  ];
  dateCreated = new Date(2019, 7, 20).toISOString().substring(0, 10);
  datePublished = new Date(2019, 7, 20).toISOString().substring(0, 10);
  location = {
    place: 'Myakka River State Park',
    city: 'Sarasota',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new WonderWhereTheRoadLeadsYou();
  }
}
