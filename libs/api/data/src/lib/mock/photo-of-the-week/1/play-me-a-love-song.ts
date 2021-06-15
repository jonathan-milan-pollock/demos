import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class PlayMeALoveSong extends PhotoOfTheWeekDto {
  slug = 'play-me-a-love-song';
  group = 1;
  title = 'Play Me a Love Song';
  description = `Play me a love song, I don't care if you play out of tune`;
  keywords = [
    'Nederland',
    'Colorado',
    'Guitar',
    'Romantic',
    'Music',
    'Enjoyment',
    'Mountains',
  ];
  dateCreated = new Date(2019, 9, 9).toISOString().substring(0, 10);
  datePublished = new Date(2019, 9, 9).toISOString().substring(0, 10);
  location = {
    city: 'Nederland',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new PlayMeALoveSong();
  }
}
