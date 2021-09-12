import { ReviewDto } from '@dark-rush-photography/shared/types';

export class CeliaQuillian extends ReviewDto {
  title = 'Celia Quillian';
  text = [
    `
    Dark has an excellent skill for capturing the essence and
    personality of a moment. She's also a joy to be around,
    making her subjects feel at ease!
    `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new CeliaQuillian();
  }
}
