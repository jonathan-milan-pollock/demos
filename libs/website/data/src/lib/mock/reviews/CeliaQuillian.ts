import { Review } from '@dark-rush-photography/shared-types';

export class CeliaQuillian implements Review {
  identifier = {
    slug: 'celia-quillian',
  };
  meta = {
    title: 'Celia Quillian',
    description: `
    Dark has an excellent skill for capturing the essence and
    personality of a moment. She's also a joy to be around, 
    making her subjects feel at ease!
    `,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new CeliaQuillian();
  }
}
