import { EventDto } from '@dark-rush-photography/api/types';

export class ClassicCars1952Pontiac extends EventDto {
  slug = 'classic-cars-1952-pontiac';
  group = 2017;
  title = 'Classic 1952 Pontiac';
  description = `
    Over the holiday, my photographer friends and I went
    out to capture photos around Goodwater, Alabama.
  `;
  keywords = ['Goodwater', 'Alabama', 'Classic', '1952 Pontiac', 'Car'];
  dateCreated = new Date(1, 7, 2018).toISOString().substring(0, 10);
  datePublished = new Date(1, 7, 2018).toISOString().substring(0, 10);
  location = {
    city: 'Goodwater',
    stateOrProvince: 'Alabama',
    country: 'United States',
  };
  useTileImage = false;
  text = [
    `Over the holiday, my photographer friends and I went
      out to capture photos around Goodwater, Alabama.  On
      the side of the road was this classic 1952 Pontiac.
      While we heard them in their backyard shooting
      something (perhaps squirrel), we were in front
      "shooting" their car!`,
  ];

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new ClassicCars1952Pontiac();
  }
}
