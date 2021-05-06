import { Event, Month } from '@dark-rush-photography/shared-types';

export class EscapeToTheMountains2018 implements Event {
  slug = 'escape-to-the-mountains-2018';
  group = 2018;
  title = 'Escape to the Mountains, 2018';
  description = `
    Escape to the mountains of Helen, Blue Ridge, and Sautee
  `;
  keywords = new Set<string>([
    'The Mountains',
    'Georgia',
    'Mountain Escape',
    'Helen',
    'Blue Ridge',
    'Sautee',
    'Tommy Conner',
    'Cowboys and Angels Bar',
    'Smithgall Woods State Park',
    'Castle Inn in Helen',
  ]);
  dateCreated = { month: Month.October, day: 6, year: 2018 };
  location = {
    place: 'The Mountains',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [
    `
      On the weekend of October 6, 2018 my longtime friend Donna 
      Jeffries and I escaped to the mountains. Visiting Helen, 
      Blue Ridge and Sautee there were so many amazing moments
      but there are three that stand out.
      `,
    `
      One highlight of the trip was visiting Tommy Conner, a
      great friend and musician which I hadn't seen in over a
      year. Walking into the Cowboys and Angels Bar he even
      stopped his set to greet me, that was a great feeling! I
      even had the opportunity to meet his wife.
      `,
    `
      Another amazing moment was on the hay ride at Smithgall 
      Woods State Park. Since I was child, a dream has been to
      be a National Geographic photographer. To my surprise the
      hay ride driver had seen my photography gear and stopped
      when he had reached a particularly scenic location. He
      then announced to the passengers that he had to stop for a 
      National Geographic photographer to take pictures. When
      everyone on the hayride turned to look at me, I realized
      he meant me! Phenomenal!
      `,
    `
      My last favorite experience was with the manager of the
      Castle Inn in Helen, Debbie Watson. Having visited the
      hotel several times I had become friends with Debbie and
      she invited me to spend time at her home. Meeting her
      husband, playing music, with great laughter and
      storytelling made me feel I was among family."
      `,
    `
      Needless to say, I can't wait for my next mountain escape adventure!
      `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new EscapeToTheMountains2018();
  }
}
