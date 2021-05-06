import { Review } from '@dark-rush-photography/shared-types';

export class CeliaQuillian implements Review {
  slug = 'celia-quillian';
  name = 'Celia Quillian';
  text = [
    `
    Dark has an excellent skill for capturing the essence and
    personality of a moment. She's also a joy to be around, 
    making her subjects feel at ease!
    `,
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new CeliaQuillian();
  }
}
