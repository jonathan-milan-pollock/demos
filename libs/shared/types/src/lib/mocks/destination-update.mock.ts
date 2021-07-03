import * as faker from 'faker';

import { SocialMediaType } from '../enums/social-media-type.enum';
import { DestinationUpdate } from '../interfaces/destination-update.interface';
import { mockLocation } from './location.mock';

export const mockDestinationUpdate = (): DestinationUpdate => ({
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  useTileImage: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
  hasExtendedReality: faker.datatype.boolean(),
  websiteUrl: faker.internet.url(),
  socialMediaUrls: [
    {
      type: faker.random.arrayElement(Object.values(SocialMediaType)),
      url: faker.internet.url(),
    },
    {
      type: faker.random.arrayElement(Object.values(SocialMediaType)),
      url: faker.internet.url(),
    },
  ],
});
