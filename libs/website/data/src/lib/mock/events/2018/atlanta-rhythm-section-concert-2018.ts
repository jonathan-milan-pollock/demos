import { Event, Month } from '@dark-rush-photography/shared-types';

export class AtlantaRhythmSectionConcert2018 implements Event {
  identifier = {
    slug: 'atlanta-rhythm-section-concert-2018',
    group: 2018,
  };
  metadata = {
    title: 'Atlanta Rhythm Section (ARS) Concert, 2018',
    description: `
    In the cool of the evenin' when everything is gettin' kind of
    "groovy", Atlanta Rhythm Section (ARS) took the stage
  `,
    keywords: new Set<string>([
      'Sandy Springs',
      'Georgia',
      'Atlanta Rhythm Section (ARS)',
      'Performance',
      'Heritage Sandy Springs',
      'Amazing Concert',
    ]),
    dateCreated: { month: Month.October, day: 14, year: 2018 },
  };
  location = {
    place: 'Heritage Sandy Springs',
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {
    text: [
      `
        In the cool of the evenin' when everything is gettin' kind of
        "groovy", Atlanta Rhythm Section (ARS) took the stage and performed
        an amazing concert. I loved being the photographer, getting to
        know the band, and listening to them perform. 
      `,
      `
        Love is kinda crazy with a spooky little girl like me!
      `,
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new AtlantaRhythmSectionConcert2018();
  }
}
