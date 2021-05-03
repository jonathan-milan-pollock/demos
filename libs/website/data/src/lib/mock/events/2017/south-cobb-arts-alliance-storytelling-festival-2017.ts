import { Event, Month } from '@dark-rush-photography/shared-types';

export class SouthCobbArtsAllianceStorytellingFestival2017 implements Event {
  identifier = {
    slug: 'south-cobb-arts-alliance-storytelling-festival-2017',
    group: 2017,
  };
  metadata = {
    title: 'South Cobb Arts Alliance, Storytelling Festival, 2017',
    description: `
    The Storytelling Festival was the perfect 
    event for children of all ages (including me!) at the
    Mable House in Mableton, Georgia.
  `,
    keywords: new Set<string>([
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
    ]),
    dateCreated: { month: Month.September, day: 23, year: 2017 },
  };
  location = {
    place: 'Mable House',
    city: 'Mableton',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {
    text: [
      `
        Sandra Miller, president of South Cobb Arts Alliance (SCAA), 
        a wonderful lady that I don't get to see often enough,
        invited me to shoot the Storytelling Festival. It was a
        great event with costumed performers telling stories, 
        "face" painting, clowns, dancing, and signing. It was the perfect 
        event for children of all ages (including me!) at the
        Mable House in Mableton, Georgia.
        `,
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new SouthCobbArtsAllianceStorytellingFestival2017();
  }
}
