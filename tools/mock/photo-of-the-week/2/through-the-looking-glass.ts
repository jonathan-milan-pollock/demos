import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class ThroughTheLookingGlass extends PhotoOfTheWeekDto {
  group = 2;
  slug = 'through-the-looking-glass';
  title = 'Through the Looking Glass';
  description = `I enjoy the colors in this photo, as the colors in front of the
    menu are the same color as the marble.`;
  keywords = [
    'Palm Beach',
    'Florida',
    'Glasses',
    'Menu',
    'Marble',
    'Composition',
  ];
  dateCreated = new Date(2020, 2, 22).toISOString().substring(0, 10);
  datePublished = new Date(2020, 2, 22).toISOString().substring(0, 10);
  location = {
    city: 'Palm Beach',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new ThroughTheLookingGlass();
  }
}
