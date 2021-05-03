import { PhotoOfTheWeek, Month } from '@dark-rush-photography/shared-types';

export class PlayMeALoveSong implements PhotoOfTheWeek {
  identifier = {
    slug: 'play-me-a-love-song',
    group: 1,
  };
  metadata = {
    title: 'Play Me a Love Song',
    description: `
    Play me a love song, I don't care if you play out of tune`,
    keywords: new Set<string>([
      'Nederland',
      'Colorado',
      'Guitar',
      'Romantic',
      'Music',
      'Enjoyment',
      'Mountains',
    ]),
    datePublished: { month: Month.September, day: 9, year: 2019 },
  };
  location = {
    city: 'Nederland',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  display = {
    useTitleImage: false,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): PhotoOfTheWeek {
    return new PlayMeALoveSong();
  }
}
