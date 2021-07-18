import {
  DestinationUpdateDto,
  Location,
  SocialMediaType,
} from '@dark-rush-photography/shared/types';
import * as faker from 'faker';

const mockLocation = (): Location => ({
  place: faker.company.companyName(),
  street: faker.address.streetAddress(),
  stateOrProvince: faker.address.state(),
  zipCode: faker.address.zipCode(),
  country: faker.address.country(),
  geo: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  },
});

const mockDestinationUpdate = (): DestinationUpdateDto => ({
  slug: faker.lorem.word().toLowerCase(),
  isPublic: faker.datatype.boolean(),
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
