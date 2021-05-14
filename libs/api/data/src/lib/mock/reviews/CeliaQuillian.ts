import { Review, DocumentType } from '@dark-rush-photography/shared-types';

export class CeliaQuillian implements Review {
  id = '';
  type: DocumentType = 'Review';
  title = 'Celia Quillian';
  text = [
    `
    Dark has an excellent skill for capturing the essence and
    personality of a moment. She's also a joy to be around, 
    making her subjects feel at ease!
    `,
  ];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new CeliaQuillian();
  }
}
