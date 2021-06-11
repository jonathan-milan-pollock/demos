import { CreateDestinationDto } from '@dark-rush-photography/api/types';

export class Colorado extends CreateDestinationDto {
  slug = 'colorado';
  title = 'Colorado';
  description = `
      An Extended Reality (XR) experience Colorado presented by Dark Rush Photography
  `;
  keywords = ['Colorado', 'Mountains', 'Beautiful'];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    stateOrProvince: 'Colorado',
    country: 'United States',
  };
  useTitleImage = false;
  text = ['Please welcome me to Colorado so I can discover you'];

  private constructor() {
    super();
  }

  static of(): CreateDestinationDto {
    return new Colorado();
  }
}
