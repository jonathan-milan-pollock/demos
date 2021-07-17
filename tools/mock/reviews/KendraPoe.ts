import { ReviewDto } from '@dark-rush-photography/api/types';

export class KendraPoe extends ReviewDto {
  title = 'Kendra Poe';
  text = [
    `
    Wonderful Photographer & Person! Just ask and she will deliver!
  `,
  ];

  private constructor() {
    super();
  }

  static of(): ReviewDto {
    return new KendraPoe();
  }
}
