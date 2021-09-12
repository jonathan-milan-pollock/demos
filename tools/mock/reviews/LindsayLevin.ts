import { ReviewDto } from '@dark-rush-photography/shared/types';

export class LindsayLevin extends ReviewDto {
  title = 'Lindsay Levin';
  text = [
    `
    Dark is such a dynamic and talented professional. She did
    excellent preparation before photographing my event - taking
    time to learn the personalities so she would know how to
    navigate taking photos at the event. The pictures really
    captured the energy at the 150+ event and everyone is very
    pleased.
  `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new LindsayLevin();
  }
}
