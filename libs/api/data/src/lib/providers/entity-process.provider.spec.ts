/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';

import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';

import { ConfigProvider } from './config.provider';
import { ImageProcessAllProvider } from './image-process-all.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';
import { EntityProcessProvider } from './entity-process.provider';

describe('entity-process.provider', () => {
  let entityProcessProvider: EntityProcessProvider;
  let imageProcessAllProvider: ImageProcessAllProvider;

  beforeEach(async () => {
    class MockConfigProvider {}
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityProcessProvider,
        ImageProcessAllProvider,
        ImageProcessOneProvider,
        ImageExifProvider,
        ImageTinifyProvider,
        ImageResizeProvider,
        ImageAddBlobProvider,
      ],
    }).compile();

    entityProcessProvider = moduleRef.get<EntityProcessProvider>(
      EntityProcessProvider
    );
    imageProcessAllProvider = moduleRef.get<ImageProcessAllProvider>(
      ImageProcessAllProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('processEntity$', () => {
    it('should process an entity', (done: any) => {
      const mockedProcessStarredImage$ = jest
        .spyOn(imageProcessAllProvider, 'processStarredImage$')
        .mockReturnValue(of(undefined));

      const mockedProcessLovedImages$ = jest
        .spyOn(imageProcessAllProvider, 'processLovedImages$')
        .mockReturnValue(of(undefined));

      const mockedProcessAllImages$ = jest
        .spyOn(imageProcessAllProvider, 'processAllImages$')
        .mockReturnValue(of(undefined));

      entityProcessProvider.processEntity$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedProcessStarredImage$).toBeCalledTimes(1);
        expect(mockedProcessLovedImages$).toBeCalledTimes(1);
        expect(mockedProcessAllImages$).toBeCalledTimes(1);
        done();
      });
    });
  });
});
