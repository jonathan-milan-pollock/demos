import { DestinationDto } from '@dark-rush-photography/shared/types';

export class Colorado extends DestinationDto {
  slug = 'colorado';
  title = 'Colorado';
  description = `
      An Extended Reality (XR) experience Colorado presented by Dark Rush Photography
  `;
  keywords = ['Colorado', 'Mountains', 'Beautiful'];
  createdDate = new Date(2018, 1, 7).toISOString().substring(0, 10);
  publishedDate = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  starredImageIsCentered = false;
  text = ['Please welcome me to Colorado so I can discover you'];

  private constructor() {
    super();
  }

  static of(): DestinationDto {
    return new Colorado();
  }
}
