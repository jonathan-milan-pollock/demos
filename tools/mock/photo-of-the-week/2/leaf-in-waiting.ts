import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class LeafInWaiting extends PhotoOfTheWeekDto {
  group = 2;
  slug = 'leaf-in-waiting';
  title = 'Leaf in Waiting';
  description = `I'm a leaf waiting for you`;
  keywords = ['Alexander City', 'Alabama', 'Maple Leaf', 'Colorful'];
  dateCreated = new Date(2020, 3, 21).toISOString().substring(0, 10);
  datePublished = new Date(2020, 3, 21).toISOString().substring(0, 10);
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new LeafInWaiting();
  }
}
