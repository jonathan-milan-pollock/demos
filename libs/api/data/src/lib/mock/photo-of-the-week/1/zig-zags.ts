import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';

export class ZigZags extends PhotoOfTheWeekDto {
  slug = 'zig-zags';
  group = 1;
  title = 'Zig Zags';
  description = `Which line takes me where? I like the lines and the zig zags in this photo!`;
  keywords = [
    'Stone Mountain Park',
    'Georgia',
    'Stairs',
    'Pattern',
    'Zig-zags',
    'Pathway',
    'Shadows',
  ];
  dateCreated = new Date(2019, 9, 21).toISOString().substring(0, 10);
  datePublished = new Date(2019, 9, 21).toISOString().substring(0, 10);
  location = {
    place: 'Stone Mountain Park',
    city: 'Georgia',
    country: 'United States',
  };
  useTileImage = false;

  private constructor() {
    super();
  }

  static of(): PhotoOfTheWeekDto {
    return new ZigZags();
  }
}
