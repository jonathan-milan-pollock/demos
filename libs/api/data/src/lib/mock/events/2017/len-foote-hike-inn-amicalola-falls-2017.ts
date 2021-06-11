import { EventDto } from '@dark-rush-photography/api/types';

export class LenFooteHikeInnAmicalolaFalls2017 extends EventDto {
  slug = 'len-foote-hike-inn-amicalola-falls-2017';
  group = 2017;
  title = 'Len Foote Hike Inn, 2017';
  description = `
    The picturesque scenery around the Len Foote Hike Inn made for a
    wonderful photography opportunity
  `;
  keywords = [
    'Len Foote Hike Inn',
    'Amicalola Falls',
    'Dawsonville',
    'Georgia',
    'Outdoors',
    'Adventure',
    'Retreat',
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Amicalola Falls',
    city: 'Dawsonville',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
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
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new LenFooteHikeInnAmicalolaFalls2017();
  }
}
