import * as faker from 'faker';

import { DUMMY_MONGODB_ID } from '../constants/constants';
import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { ImageDimension } from '../interfaces/image-dimension.interface';

export const mockImageDimension = (): ImageDimension => ({
  id: faker.datatype.uuid(),
  entityId: DUMMY_MONGODB_ID,
  imageId: faker.datatype.uuid(),
  type: faker.random.arrayElement(Object.values(ImageDimensionType)),
  pixels: {
    width: faker.datatype.number(),
    height: faker.datatype.number(),
  },
  threeSixtyImageSettings: {
    pitch: faker.datatype.number(),
    yaw: faker.datatype.number(),
    hfov: faker.datatype.number(),
  },
});
