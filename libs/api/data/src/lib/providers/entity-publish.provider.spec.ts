/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import { DUMMY_MONGODB_ID } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityProcessProvider } from './entity-process.provider';
import { ImageProcessAllProvider } from './image-process-all.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';
import { ImagePublishProvider } from './image-publish.provider';
import { ImageVideoPublishProvider } from './image-video-publish.provider';
import { ImageVideoMeltProvider } from './image-video-melt.provider';
import { ImageVideoMeltProcessProvider } from './image-video-melt-process.provider';
import { ImageVideoFfmpegExifProvider } from './image-video-ffmpeg-exif.provider';
import { ImageVideoFfmpegFrontCoverProvider } from './image-video-ffmpeg-front-cover.provider';
import { ImageVideoEmailProvider } from './image-video-email.provider';
import { SocialMediaPostProvider } from './social-media-post.provider';
import { EntityPublishProvider } from './entity-publish.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-publish-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-publish-validation.functions'),
}));
import * as entityPublishValidationFunctions from '../entities/entity-publish-validation.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

describe('entity-publish.provider', () => {
  let entityPublishProvider: EntityPublishProvider;
  let entityProcessProvider: EntityProcessProvider;
  let imagePublishProvider: ImagePublishProvider;
  let imageVideoPublishProvider: ImageVideoPublishProvider;
  let imageVideoEmailProvider: ImageVideoEmailProvider;
  let socialMediaPostProvider: SocialMediaPostProvider;

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
        EntityPublishProvider,
        EntityProcessProvider,
        ImageProcessAllProvider,
        ImageProcessOneProvider,
        ImageExifProvider,
        ImageTinifyProvider,
        ImageResizeProvider,
        ImageAddBlobProvider,
        ImagePublishProvider,
        ImageVideoPublishProvider,
        ImageVideoMeltProvider,
        ImageVideoMeltProcessProvider,
        ImageVideoFfmpegExifProvider,
        ImageVideoFfmpegFrontCoverProvider,
        ImageVideoEmailProvider,
        SocialMediaPostProvider,
      ],
    }).compile();

    entityPublishProvider = moduleRef.get<EntityPublishProvider>(
      EntityPublishProvider
    );
    entityProcessProvider = moduleRef.get<EntityProcessProvider>(
      EntityProcessProvider
    );
    imagePublishProvider =
      moduleRef.get<ImagePublishProvider>(ImagePublishProvider);
    imageVideoPublishProvider = moduleRef.get<ImageVideoPublishProvider>(
      ImageVideoPublishProvider
    );
    imageVideoEmailProvider = moduleRef.get<ImageVideoEmailProvider>(
      ImageVideoEmailProvider
    );
    socialMediaPostProvider = moduleRef.get<SocialMediaPostProvider>(
      SocialMediaPostProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('publishEntity$', () => {
    it('should publish an entity', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedValidatePublishEntity = jest
        .spyOn(entityPublishValidationFunctions, 'validatePublishEntity')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedProcessEntity$ = jest
        .spyOn(entityProcessProvider, 'processEntity$')
        .mockReturnValue(of(undefined));

      const mockedPublishImages$ = jest
        .spyOn(imagePublishProvider, 'publishImages$')
        .mockReturnValue(of(undefined));

      const mockedPublishImageVideo$ = jest
        .spyOn(imageVideoPublishProvider, 'publishImageVideo$')
        .mockReturnValue(of(undefined));

      const mockedEmailImageVideo$ = jest
        .spyOn(imageVideoEmailProvider, 'emailImageVideo$')
        .mockReturnValue(of(undefined));

      const mockedPostSocialMedia$ = jest
        .spyOn(socialMediaPostProvider, 'postSocialMedia$')
        .mockReturnValue(of(undefined));

      entityPublishProvider
        .publishEntity$(DUMMY_MONGODB_ID, faker.datatype.boolean())
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedValidatePublishEntity).toBeCalledTimes(1);
          expect(mockedProcessEntity$).toBeCalledTimes(1);
          expect(mockedPublishImages$).toBeCalledTimes(1);
          expect(mockedPublishImageVideo$).toBeCalledTimes(1);
          expect(mockedEmailImageVideo$).toBeCalledTimes(1);
          expect(mockedPostSocialMedia$).toBeCalledTimes(1);
          done();
        });
    });
  });
});
