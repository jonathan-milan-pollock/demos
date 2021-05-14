import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class WonderWhereTheRoadLeadsYou implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
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
  datePublished = { month: Month.July, day: 20, year: 2019 };
  location = {
    place: 'Myakka River State Park',
    city: 'Sarasota',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new WonderWhereTheRoadLeadsYou();
  }
}
