import { PhotoOfTheWeekDto } from '@dark-rush-photography/shared/types';

export class CuriouserAndCuriouser extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'curiouser-and-curiouser';
  title = 'Curiouser and Curiouser!';
  description = `Curious, What Do You See? I'm Getting Curiouser and Curiouser!`;
  keywords = [
    'Buena Vista',
    'Colorado',
    'Looking Glass',
    'Window Pane',
    'Another World',
    'Colorful',
  ];
  dateCreated = new Date(2019, 8, 18).toISOString().substring(0, 10);
  datePublished = new Date(2019, 8, 18).toISOString().substring(0, 10);
  location = {
    city: 'Buena Vista',
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  photoAlbumImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new CuriouserAndCuriouser();
  }
}
