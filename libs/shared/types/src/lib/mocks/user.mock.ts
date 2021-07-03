import * as faker from 'faker';

import { User } from '../interfaces/user.interface';

export const mockUser = (): User => ({
  email: faker.internet.email(),
  name: faker.name.findName(faker.name.firstName(), faker.name.lastName()),
  image: faker.image.dataUri(),
});
