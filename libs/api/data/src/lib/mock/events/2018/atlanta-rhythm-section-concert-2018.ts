import { EventDto } from '@dark-rush-photography/api/types';

export class AtlantaRhythmSectionConcert2018 extends EventDto {
  slug = 'atlanta-rhythm-section-concert-2018';
  group = 2018;
  title = 'Atlanta Rhythm Section (ARS) Concert, 2018';
  description = `
  In the cool of the evenin' when everything is gettin' kind of
  "groovy", Atlanta Rhythm Section (ARS) took the stage
`;
  keywords = [
    'Sandy Springs',
    'Georgia',
    'Atlanta Rhythm Section (ARS)',
    'Performance',
    'Heritage Sandy Springs',
    'Amazing Concert',
  ];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    place: 'Heritage Sandy Springs',
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTileImage = false;
  text = [
    `
      In the cool of the evenin' when everything is gettin' kind of
      "groovy", Atlanta Rhythm Section (ARS) took the stage and performed
      an amazing concert. I loved being the photographer, getting to
      know the band, and listening to them perform. 
    `,
    `
      Love is kinda crazy with a spooky little girl like me!
    `,
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new AtlantaRhythmSectionConcert2018();
  }
}
