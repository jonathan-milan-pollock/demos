import * as path from 'path';

import * as faker from 'faker';

import { getPublishFileName } from './image-publish-file-name.functions';

describe('image-publish-file-name.functions', () => {
  describe('getPublishFileName', () => {
    it('should return a file name with slug and order when renaming', () => {
      const slug = faker.lorem.word();
      const order = faker.datatype.number();
      const extension = '.jpg';

      const imageFileName = `${
        path.parse(faker.system.fileName()).name
      }-${order}${extension}`;
      const result = getPublishFileName(slug, order, imageFileName, true);
      expect(result).toBe(`${slug}-${order}${extension}`);
    });

    it('should return the file name when not renaming', () => {
      const imageFileName = faker.system.fileName();
      const result = getPublishFileName(
        faker.lorem.word(),
        faker.datatype.number(),
        imageFileName,
        false
      );
      expect(result).toBe(imageFileName);
    });
  });
});
