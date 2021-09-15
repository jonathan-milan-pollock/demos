import { EventDto } from '@dark-rush-photography/shared/types';

export class TheLightsFestAtlanta2018 extends EventDto {
  group = 2018;
  slug = 'the-lights-fest-atlanta-2018';
  title = 'The Lights Fest Atlanta 2018';
  description = '';
  keywords = [];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    country: 'United States',
  };
  photoAlbumImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new TheLightsFestAtlanta2018();
  }
}
