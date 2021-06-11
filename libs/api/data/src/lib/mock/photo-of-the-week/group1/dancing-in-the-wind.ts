import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class DancingInTheWind extends PhotoOfTheWeekDto {
  slug = 'dancing-in-the-wind';
  group = 1;
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
  useTitleImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new DancingInTheWind();
  }
}
