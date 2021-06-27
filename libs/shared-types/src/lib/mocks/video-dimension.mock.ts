import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { VideoDimension } from '../interfaces/video-dimension.interface';

export const mockVideoDimension = (): VideoDimension => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  videoId: faker.datatype.uuid(),
  type: faker.random.arrayElement(Object.values(VideoDimensionType)),
  pixels: {
    width: faker.datatype.number(),
    height: faker.datatype.number(),
  },
});
