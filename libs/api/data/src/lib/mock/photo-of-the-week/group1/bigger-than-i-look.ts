import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class BiggerThanILook extends PhotoOfTheWeekDto {
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
  dateCreated = new Date(2019, 7, 31).toISOString().substring(0, 10);
  datePublished = new Date(2019, 7, 31).toISOString().substring(0, 10);
  location = {
    place: 'Cumberland Island',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new BiggerThanILook();
  }
}
