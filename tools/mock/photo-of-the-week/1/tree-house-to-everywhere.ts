import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class TreeHouseToEverywhere extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'tree-house-to-everywhere';
  title = 'The Tree House to Everywhere';
  description = `
    My cousin Thomas built this tree house when he was in high
    school. I would sit in the tree house and think how cool it was
    to be at the height of the birds and be in nature. It didn't need
    bells or whistles, it's just all natural, it is what it is.`;
  keywords = [
    'Alexander City',
    'Alabama',
    'Tree House',
    'Childhood',
    'Memories',
    'Stairs',
    'Woods',
    'Birds',
    'Nature',
    'Natural',
  ];
  dateCreated = new Date(2019, 6, 2).toISOString().substring(0, 10);
  datePublished = new Date(2019, 6, 2).toISOString().substring(0, 10);
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
    return new TreeHouseToEverywhere();
  }
}
