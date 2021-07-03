import * as faker from 'faker';

import { Location } from '../interfaces/location.interface';

export const mockLocation = (): Location => ({
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
