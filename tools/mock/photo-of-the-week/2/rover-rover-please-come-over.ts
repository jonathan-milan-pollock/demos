import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class RoverRoverPleaseComeOver extends PhotoOfTheWeekDto {
  group = 2;
  slug = 'rover-rover-please-come-over';
  title = 'Rover Rover Please Come Over';
  description = `Rover is my best customer`;
  keywords = [
    'Englewood',
    'Florida',
    'Rover',
    'Family Store',
    'Family',
    'Happy',
    'Memories',
  ];
  dateCreated = new Date(2020, 1, 27).toISOString().substring(0, 10);
  datePublished = new Date(2020, 1, 27).toISOString().substring(0, 10);
  location = {
    city: 'Englewood',
    stateOrProvince: 'Florida',
    country: 'United States',
  };
  photoAlbumImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new RoverRoverPleaseComeOver();
  }
}
