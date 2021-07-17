import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class YouAlreadyAreHome extends PhotoOfTheWeekDto {
  group = 1;
  slug = 'you-already-are-home';
  title = 'You Already are Home';
  description = `This reminds me of the movie Almost Famous when the boy says, 'I
    have to go home' and the response is 'You Already are Home' as
    Tiny Dancer plays in the background. My parents and I were in the
    Smoky Mountains when we met the couple that owned this beetle. A" "railroad is also in the background. I think this is the coolest
    picture ever and one of my all-time favorites I've taken.`;
  keywords = [
    'Great Smoky Mountains',
    'Camping',
    'Scenic',
    'Memories',
    'Railroad',
    'VW Classic Bus',
    'Almost Famous',
    'Outdoors',
  ];
  dateCreated = new Date(2019, 4, 12).toISOString().substring(0, 10);
  datePublished = new Date(2019, 4, 12).toISOString().substring(0, 10);
  location = { place: 'Great Smoky Mountains', country: 'United States' };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new YouAlreadyAreHome();
  }
}
