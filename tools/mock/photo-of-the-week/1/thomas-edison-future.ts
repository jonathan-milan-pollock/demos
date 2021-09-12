import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class ThomasEdisonFuture extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'thomas-edison-future';
  title = 'Thomas Edison in the Future';
  description = `
    This is at Stone Mountain, Georgia at the Country Living Magazine
    Fair. I love the coils and the reflection of the sky and feel" "Edison would be very proud if he saw this photo.`;
  keywords = [
    'Country Living Magazine Fair',
    'Stone Mountain',
    'Georgia',
    'Coils',
    'Thomas Edison',
    'Edison Light Bulb',
    'Warmth',
    'Reflection',
  ];
  dateCreated = new Date(2019, 4, 18).toISOString().substring(0, 10);
  datePublished = new Date(2019, 4, 18).toISOString().substring(0, 10);
  location = {
    place: 'Country Living Magazine Fair',
    city: 'Stone Mountain',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new ThomasEdisonFuture();
  }
}
