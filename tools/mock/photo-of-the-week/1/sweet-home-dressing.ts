import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class SweetHomeDressing extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'sweet-home-dressing';
  title = 'Take Me Home Sweet Southern Dressing';
  description = `
    Oh! Thanksgiving, one of my fondest memories in my hometown. I've
    gained friends because of my sweet mothers hospitality and cooking.`;
  keywords = [
    'Alexander City',
    'Alabama',
    'Thanksgiving Meal',
    'Southern Cooking',
    'Home Cooking',
    'Moms Cooking',
    'Home',
    'Memories',
    'Friends',
    'Hospitality',
  ];
  dateCreated = new Date(2019, 11, 25).toISOString().substring(0, 10);
  datePublished = new Date(2019, 11, 25).toISOString().substring(0, 10);
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  starredImageIsCenteredIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new SweetHomeDressing();
  }
}
