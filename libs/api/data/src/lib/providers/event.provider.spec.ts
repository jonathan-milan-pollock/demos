import * as faker from 'faker';

import {
  EventCreate,
  EventUpdate,
  Location,
} from '@dark-rush-photography/shared/types';

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

const mockEventUpdate = (): EventUpdate => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  dateCreated: faker.date.recent().toISOString(),
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  tileImageIsCentered: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
});

const mockEventCreate = (): EventCreate => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
});
