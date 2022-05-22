import { IS_PUBLIC } from '@dark-rush-photography/shared/types';
import { Public } from './public.decorator';

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
}));
import * as nestJsCommon from '@nestjs/common';

describe('public.decorator', () => {
  describe('Public', () => {
    it('should set metadata for IS_PUBLIC to true', async () => {
      const mockedSetMetadata = jest
        .spyOn(nestJsCommon, 'SetMetadata')
        .mockImplementation();

      Public();
      expect(mockedSetMetadata).toHaveBeenCalledWith(IS_PUBLIC, true);
    });
  });
});
