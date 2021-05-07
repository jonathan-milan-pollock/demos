import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class BiggerThanILook implements PhotoOfTheWeek {
  id = '';
  slug = 'bigger-than-i-look';
  group = 1;
  title = "I'm Bigger than I Look!";
  description = `
    This a crab on Cumberland Island on Beach. It's kind of a facade,
    reminds me of a tiny kitten looking into the mirror and seeing his
    reflection as a lion, thinking I am big and great!`;
  keywords = [
    'Cumberland Island',
    'Georgia',
    'Crab',
    'Facade',
    'Beach',
    'Big and Great',
    'Reflective',
  ];
  datePublished = { month: Month.July, day: 31, year: 2019 };
  location = {
    place: 'Cumberland Island',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new BiggerThanILook();
  }
}
