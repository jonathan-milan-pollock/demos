import * as faker from 'faker';

import { EventCreate } from '../interfaces/event-create.interface';

export const mockEventCreate = (): EventCreate => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
});
