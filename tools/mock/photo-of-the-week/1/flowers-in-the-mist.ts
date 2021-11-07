import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class FlowersInTheMist extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'flowers-in-the-mist';
  title = 'Flowers in the Mist';
  description = `
    Literally on top of the mountain top, as high as I could be. I
    was in Bryson City, North Carolina with my parents on their 50th
    wedding anniversary and the mountains are in the background.`;
  keywords = [
    'Bryson City',
    'North Carolina',
    'Mountain Top',
    'Misty',
    'Wild Flowers',
    'Mountains',
  ];
  createdDate = new Date(2019, 6, 8).toISOString().substring(0, 10);
  publishedDate = new Date(2019, 6, 8).toISOString().substring(0, 10);
  location = {
    city: 'Bryson City',
    stateOrProvince: 'North Carolina',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new FlowersInTheMist();
  }
}
