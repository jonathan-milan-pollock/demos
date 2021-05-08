import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class CuriouserAndCuriouser implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'curiouser-and-curiouser';
  group = 1;
  title = 'Curiouser and Curiouser!';
  description = `Curious, What Do You See? I'm Getting Curiouser and Curiouser!`;
  keywords = [
    'Buena Vista',
    'Colorado',
    'Looking Glass',
    'Window Pane',
    'Another World',
    'Colorful',
  ];
  datePublished = { month: Month.August, day: 18, year: 2019 };
  location = {
    city: 'Buena Vista',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new CuriouserAndCuriouser();
  }
}
