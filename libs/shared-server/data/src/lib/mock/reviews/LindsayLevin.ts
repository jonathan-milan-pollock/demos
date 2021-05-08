import { Review, DocumentType } from '@dark-rush-photography/shared-types';

export class LindsayLevin implements Review {
  id = '';
  type: DocumentType = 'Review';
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
  images = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Review {
    return new LindsayLevin();
  }
}
