import { EventDto } from '@dark-rush-photography/shared/types';

export class ThanksgivingInAlexanderCity2018 extends EventDto {
  group = 2018;
  slug = 'thanksgiving-in-alexander-city-2018';
  title = `Thanksgiving in Alexander City, 2018`;
  description = `
    It's beginning to look a lot like Christmas
  `;
  keywords = ['Alexander City', 'Georgia', 'Hometown', 'Christmas'];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;
  text = [
    `
      It's beginning to look a lot like Christmas
      `,
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new ThanksgivingInAlexanderCity2018();
  }
}
