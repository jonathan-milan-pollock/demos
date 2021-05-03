import { Review } from '@dark-rush-photography/shared-types';

export class KendraPoe implements Review {
  identifier = {
    slug: 'kendra-poe',
  };
  meta = {
    title: 'Kendra Poe',
    description: `
    Wonderful Photographer & Person! Just ask and she will deliver!
    `,
  };
  content = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new KendraPoe();
  }
}
