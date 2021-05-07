import { Event, Month } from '@dark-rush-photography/shared-types';

export class SSPCAnnualGolfInvitational2018 implements Event {
  id = '';
  slug = 'sspc-annual-golf-invitational-2018';
  group = 2018;
  title = 'SSPC Annual Golf Invitational 2018';
  description = ``;
  keywords = [];
  dateCreated = { month: Month.January, day: 7, year: 2018 };
  datePublished = { month: Month.January, day: 7, year: 2018 };
  location = {
    city: 'Sandy Springs',
    stateOrProvince: 'Georgia',
    country: 'United States',
  };
  useTitleImage = false;
  text = [];
  images = [];
  threeSixtyImages = [];
  videos = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static of(): Event {
    return new SSPCAnnualGolfInvitational2018();
  }
}
