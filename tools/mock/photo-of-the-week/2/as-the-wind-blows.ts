import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class AsTheWindBlows extends PhotoOfTheWeekDto {
  group = 2;
  slug = 'as-the-wind-blows';
  title = 'As the Wind Blows';
  description = `I was getting off the train and saw so many cool lights that I
    kinda forgot what train I was supposed to get on!`;
  keywords = ['train', 'Milan', 'Italy', 'fast', 'Railway Station', 'colorful'];
  dateCreated = new Date(2020, 3, 1).toISOString().substring(0, 10);
  datePublished = new Date(2020, 3, 1).toISOString().substring(0, 10);
  location = {
    place: 'Milano Centrale Railway Station',
    stateOrProvince: 'Milan',
    country: 'Italy',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new AsTheWindBlows();
  }
}
