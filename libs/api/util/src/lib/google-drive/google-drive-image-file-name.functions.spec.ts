import * as faker from 'faker';

import {
  getOrderFromGoogleDriveImageFileName,
  getSlugWithOrderFromGoogleDriveImageFileName,
} from './google-drive-image-file-name.functions';

describe('google-drive-file.functions', () => {
  describe('getOrderFromGoogleDriveImageFileName', () => {
    xit('should return extension from the google drive image file name', () => {
      const order = faker.datatype.number();
      const extension = '.jpg';
      const googleDriveImageFileName = `${faker.datatype.string()}-${order}${extension}`;

      const result = getOrderFromGoogleDriveImageFileName(
        googleDriveImageFileName
      );
      // expect(result.ext).toBe(extension);
    });

    xit('should return the order from the google drive image file name', () => {
      const order = faker.datatype.number();
      const extension = '.jpg';
      const googleDriveImageFileName = `${faker.datatype.string()}-${order}${extension}`;

      const result = getOrderFromGoogleDriveImageFileName(
        googleDriveImageFileName
      );
      //expect(+result.name).toBe(order);
    });
  });

  describe('getSlugWithOrderFromGoogleDriveImageFileName', () => {
    it('should return slug with order file name', () => {
      const slug = faker.lorem.word();
      const order = faker.datatype.number();
      const extension = '.jpg';

      const googleDriveImageFileName = `${faker.datatype.string()}-${order}${extension}`;
      const slugWithOrderFileName = `${slug}-${order}${extension}`;
      const result = getSlugWithOrderFromGoogleDriveImageFileName(
        slug,
        googleDriveImageFileName
      );
      expect(result).toBe(slugWithOrderFileName);
    });
  });
});
