import { EventDto } from '@dark-rush-photography/shared/types';

export class SSPCAnnualGolfInvitational2018 extends EventDto {
  group = 2018;
  slug = 'sspc-annual-golf-invitational-2018';
  title = 'SSPC Annual Golf Invitational 2018';
  description = ``;
  keywords = [];
  dateCreated = new Date(2018, 1, 7).toISOString().substring(0, 10);
  datePublished = new Date(2018, 1, 7).toISOString().substring(0, 10);
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  tileImageIsCentered = false;

  private constructor() {
    super();
  }

  static of(): EventDto {
    return new SSPCAnnualGolfInvitational2018();
  }
}
