import {
  PhotoOfTheWeek,
  DocumentType,
  Month,
} from '@dark-rush-photography/shared-types';

export class LeafInWaiting implements PhotoOfTheWeek {
  id = '';
  type: DocumentType = 'PhotoOfTheWeek';
  slug = 'leaf-in-waiting';
  group = 2;
  title = 'Leaf in Waiting';
  description = `I'm a leaf waiting for you`;
  keywords = ['Alexander City', 'Alabama', 'Maple Leaf', 'Colorful'];
  datePublished = { month: Month.March, day: 21, year: 2020 };
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new LeafInWaiting();
  }
}
