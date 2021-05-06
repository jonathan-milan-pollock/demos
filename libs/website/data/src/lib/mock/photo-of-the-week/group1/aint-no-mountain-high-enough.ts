import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class AintNoMountainHighEnough implements PhotoOfTheWeek {
  slug = 'aint-no-mountain-high-enough';
  group = 1;
  title = "Ain't No Mountain High Enough";
  description = `I held onto this Coke bottle like it was my wubby 
    for the whole time I was in Colorado to take this shot till I got to Rocky Mountain National Park.
  `;
  keywords = new Set<string>([
    'Colorado',
    'Rocky Mountain National Park',
    'Coke',
    'Outdoor',
    'Mountains',
    'Coca-Cola',
    "Ain't no mountain high enough",
  ]);
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    place: 'Rocky Mountain National Park',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `I held onto this Coke bottle like it was my wubby 
    for the whole time I was in Colorado to take this shot till I got to Rocky Mountain National Park.
  `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new AintNoMountainHighEnough();
  }
}
