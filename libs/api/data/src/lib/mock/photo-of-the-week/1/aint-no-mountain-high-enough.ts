import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class AintNoMountainHighEnough extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'aint-no-mountain-high-enough';
  title = "Ain't No Mountain High Enough";
  description = `I held onto this Coke bottle like it was my wubby 
    for the whole time I was in Colorado to take this shot till I got to Rocky Mountain National Park.
  `;
  keywords = [
    'Colorado',
    'Rocky Mountain National Park',
    'Coke',
    'Outdoor',
    'Mountains',
    'Coca-Cola',
    "Ain't no mountain high enough",
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Rocky Mountain National Park',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTileImage = false;
  text = [
    `I held onto this Coke bottle like it was my wubby 
    for the whole time I was in Colorado to take this shot till I got to Rocky Mountain National Park.
  `,
  ];

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new AintNoMountainHighEnough();
  }
}
