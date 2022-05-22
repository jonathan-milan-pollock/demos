import * as path from 'path';

import faker from '@faker-js/faker';

import { getOrderFromGoogleDriveImageFile } from './google-drive-image-file-name.functions';

describe('google-drive-image-file-name.functions', () => {
  describe('getOrderFromGoogleDriveImageFile', () => {
    it('should return order from the google drive image file', () => {
      const order = faker.datatype.number();
      const extension = '.jpg';
      const googleDriveImageFileName = `${
        path.parse(faker.system.fileName()).name
      }-${order}${extension}`;

      const result = getOrderFromGoogleDriveImageFile(googleDriveImageFileName);
      expect(result).toBe(order);
    });
  });
});
