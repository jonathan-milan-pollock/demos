import { Event, Month } from '@dark-rush-photography/shared-types';

export class LenFooteHikeInnAmicalolaFalls2017 implements Event {
  identifier = {
    slug: 'len-foote-hike-inn-amicalola-falls-2017',
    group: 2017,
  };
  metadata = {
    title: 'Len Foote Hike Inn, 2017',
    description: `
    The picturesque scenery around the Len Foote Hike Inn made for a
    wonderful photography opportunity
  `,
    keywords: new Set<string>([
      'Len Foote Hike Inn',
      'Amicalola Falls',
      'Dawsonville',
      'Georgia',
      'Outdoors',
      'Adventure',
      'Retreat',
    ]),
    datePublished: { month: Month.January, day: 7, year: 2018 },
  };
  location = {
    place: 'Amicalola Falls',
    city: 'Dawsonville',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {
    text: [
      `
      I appreciate my good friend Bill Buford, the manager of
      the Len Foote Hike Inn, picking me up and driving me
      to the Inn as I arrived late in the evening.
      `,
      `
      The picturesque scenery around the Inn made for a
       wonderful photography opportunity. I enjoyed catching
       up with Bill around the campfire, hearing his
      fascinating stories of leaving the corporate lifestyle
      to travel and photograph the world!
      `,
      `
      I would love an opportunity to visit him at the Grand 
      Canyon National Park in Arizona where he now lives.
    `,
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new LenFooteHikeInnAmicalolaFalls2017();
  }
}
