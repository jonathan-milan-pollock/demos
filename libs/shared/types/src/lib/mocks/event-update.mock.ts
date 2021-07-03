import * as faker from 'faker';

import { EventUpdate } from '../interfaces/event-update.interface';
import { mockLocation } from './location.mock';

export const mockEventUpdate = (): EventUpdate => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  dateCreated: faker.date.recent().toISOString(),
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  useTileImage: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
});
