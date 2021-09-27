import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class IllReadYourPalm extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'ill-read-your-palm';
  title = "I'll Read Your Palm";
  description = `
    I'll read your palm if you read mine in front of the palm tree.`;
  keywords = [
    'Jackson Square',
    'New Orleans',
    'Louisiana',
    'Palm Tree',
    'Blue Sky',
    'Manicured Lawn',
    'Landscaping',
  ];
  dateCreated = new Date(2019, 4, 4).toISOString().substring(0, 10);
  datePublished = new Date(2019, 4, 4).toISOString().substring(0, 10);
  location = {
    place: 'Jackson Square',
    city: 'New Orleans',
    stateOrProvince: 'Louisiana',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new IllReadYourPalm();
  }
}
