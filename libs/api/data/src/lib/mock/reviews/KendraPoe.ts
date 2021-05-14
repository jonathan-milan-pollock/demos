import { Review, DocumentType } from '@dark-rush-photography/shared-types';

export class KendraPoe implements Review {
  id = '';
  type: DocumentType = 'Review';
  title = 'Kendra Poe';
  text = [
    `
    Wonderful Photographer & Person! Just ask and she will deliver!
  `,
  ];
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new KendraPoe();
  }
}
