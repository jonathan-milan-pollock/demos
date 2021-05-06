import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class AsTheWindBlows implements PhotoOfTheWeek {
  slug = 'as-the-wind-blows';
  group = 2;
  title = 'As the Wind Blows';
  description = `I was getting off the train and saw so many cool lights that I 
    kinda forgot what train I was supposed to get on!`;
  keywords = new Set<string>([
    'train',
    'Milan',
    'Italy',
    'fast',
    'Railway Station',
    'colorful',
  ]);
  datePublished = { month: Month.March, day: 1, year: 2020 };
  location = {
    place: 'Milano Centrale Railway Station',
    stateOrProvince: 'Milan',
    country: 'Italy',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new AsTheWindBlows();
  }
}
