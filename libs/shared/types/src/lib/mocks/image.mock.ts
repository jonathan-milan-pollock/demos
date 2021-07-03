import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { MediaState } from '../enums/media-state.enum';
import { Image } from '../interfaces/image.interface';

export const mockImage = (): Image => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  fileName: faker.lorem.word().toLowerCase(),
  state: faker.random.arrayElement(Object.values(MediaState)),
  order: faker.datatype.number(),
  isStared: faker.datatype.boolean(),
  isLoved: faker.datatype.boolean(),
  isLiked: faker.datatype.boolean(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: `${faker.lorem
    .word()
    .toLowerCase()}, ${faker.lorem
    .word()
    .toLowerCase()}, ${faker.lorem.word().toLowerCase()}`,
  dateCreated: faker.date.recent().toISOString(),
  datePublished: faker.date.recent().toISOString(),
  isGenerated: faker.datatype.boolean(),
});
