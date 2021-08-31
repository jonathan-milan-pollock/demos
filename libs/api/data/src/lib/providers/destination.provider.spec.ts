import { Location } from '@dark-rush-photography/shared/types';
import * as faker from 'faker';

const mockLocation = (): Location => ({
  place: faker.company.companyName(),
  street: faker.address.streetAddress(),
  stateOrProvince: faker.address.state(),
  zipCode: faker.address.zipCode(),
  country: faker.address.country(),
});

const mockDestinationUpdate = (): DestinationUpdateDto => ({
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  tileImageIsCentered: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
  isPosted: faker.datatype.boolean(),
});
