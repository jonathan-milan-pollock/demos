import { ReviewDto } from '@dark-rush-photography/shared/types';

export class RonnieColquitt extends ReviewDto {
  title = 'Ronnie Colquitt';
  text = [
    `
    I've been Dark Rush's friend / photography friend for nearly
    10 years and I've watched her grow professionally ever
    since. Her photos just get better and better each year. She
    has developed a good eye for subject matter, color,
    composition and lighting. She is a very sweet lady as well
    as a talented photographer.
  `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new RonnieColquitt();
  }
}
