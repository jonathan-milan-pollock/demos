import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class DancingInTheWind extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'dancing-in-the-wind';
  title = 'Dancing in the Wind!';
  description = `Join us, we're dancing in the wind!`;
  keywords = [
    'United States',
    'Proud',
    'American',
    'Flag',
    'Wind',
    'Blue Sky',
    'Puffy Clouds',
  ];
  dateCreated = new Date(2019, 5, 26).toISOString().substring(0, 10);
  datePublished = new Date(2019, 5, 26).toISOString().substring(0, 10);
  location = { country: 'United States' };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new DancingInTheWind();
  }
}
