import { EventDto } from '@dark-rush-photography/api/types';

export class NativeAmericanIndianFestival2018 extends EventDto {
  group = 2018;
  slug = 'native-american-indian-festival-2018';
  title = 'Native American Indian Festival and Pow Wow, 2018';
  description = '';
  keywords = [
    'Stone Mountain',
    'Georgia',
    'Native American Festival and Pow Wow',
    'Muskogee Creek Indian',
    'Heritage',
    'Ancestry',
    'Family',
    'Celebration',
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Stone Mountain Park',
    city: 'Stone Mountain',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTileImage = false;
  text = [
    `
      "For the last several years, I've had the opportunity to "
      "attend Stone Mountain Park's Native American Festival and " 
      "Pow Wow." 
      `,
    `
      "As one of my favorite past times was having sassafras tea" "with my grandmother, I was excited when I was Jim" "Sawgrass, a speaker of Creek Indians, making sassafras tea" 
      "at the event. What a wonderful surprise!"
      `,
    `
      "This experience at the event and the day spent in the" "culture and soul of Native American Indians dancing," "playing music, and sharing stories was amazing. Growing up" 
      "in a family with both sides Muskogee Creek Indian, this" "day brought back so many wonderful memories!"
      `,
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new NativeAmericanIndianFestival2018();
  }
}
