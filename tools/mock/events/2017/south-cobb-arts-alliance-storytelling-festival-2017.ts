import { EventDto } from '@dark-rush-photography/shared/types';

export class SouthCobbArtsAllianceStorytellingFestival2017 extends EventDto {
  group = 2017;
  slug = 'south-cobb-arts-alliance-storytelling-festival-2017';
  title = 'South Cobb Arts Alliance, Storytelling Festival, 2017';
  description = `
    The Storytelling Festival was the perfect
    event for children of all ages (including me!) at the
    Mable House in Mableton, Georgia.
  `;
  keywords = [
    'Mableton',
    'Georgia',
    'Storytelling Festival',
    'South Cobb Arts Alliance',
    'Mable House',
    'Costumes',
    'Performers',
    'Face Painting',
    'Clowns',
    'Dancing',
    'Singing',
    'Children of all Ages',
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Mable House',
    city: 'Mableton',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  tileImageIsCentered = false;
  text = [
    `
        Sandra Miller, president of South Cobb Arts Alliance (SCAA),
        a wonderful lady that I don't get to see often enough,
        invited me to shoot the Storytelling Festival. It was a
        great event with costumed performers telling stories,
        "face" painting, clowns, dancing, and signing. It was the perfect
        event for children of all ages (including me!) at the
        Mable House in Mableton, Georgia.
        `,
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new SouthCobbArtsAllianceStorytellingFestival2017();
  }
}
