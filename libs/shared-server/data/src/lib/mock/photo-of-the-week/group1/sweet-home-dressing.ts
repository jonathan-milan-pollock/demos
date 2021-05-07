import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class SweetHomeDressing implements PhotoOfTheWeek {
  id = '';
  slug = 'sweet-home-dressing';
  group = 1;
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
  datePublished = { month: Month.November, day: 25, year: 2019 };
  location = {
    city: 'Alexander City',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new SweetHomeDressing();
  }
}
