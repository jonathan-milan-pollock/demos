/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import { CronProcessType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { CronProcessTable } from '../tables/cron-process.table';
import { ConfigProvider } from '../providers/config.provider';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageAddBlobProvider } from '../providers/image-add-blob.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';
import { ImagePostsService } from './image-posts.service';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../cron-processes/cron-process-start.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-start.functions'),
}));
import * as cronProcessStartFunctions from '../cron-processes/cron-process-start.functions';

describe('image-posts.service', () => {
  let imagePostsService: ImagePostsService;
  let imageAddProvider: ImageAddProvider;

  const mockedCronProcessRepositoryProvider = {
    create$: jest.fn().mockReturnValue(of(undefined)),
  };

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
        {
          provide: CronProcessRepositoryProvider.name,
          useValue: mockedCronProcessRepositoryProvider,
        },
        ImagePostsService,
        ImageAddProvider,
        ImageAddBlobProvider,
      ],
    }).compile();

    imagePostsService = moduleRef.get<ImagePostsService>(ImagePostsService);
    imageAddProvider = moduleRef.get<ImageAddProvider>(ImageAddProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create$', () => {
    it('should create an image post and upload an image', (done: any) => {
      const mockedCreateImagePostEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'createImagePostEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedAddImagePostImage$ = jest
        .spyOn(imageAddProvider, 'addImagePostImage$')
        .mockReturnValue(of(undefined));

      const mockedStartCronProcessType = jest
        .spyOn(cronProcessStartFunctions, 'startCronProcessType')
        .mockReturnValue({} as CronProcessTable);

      const mockedCreate$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'create$')
        .mockReturnValue(of(undefined));

      imagePostsService
        .create$(faker.lorem.sentence(), {} as Express.Multer.File)
        .subscribe(() => {
          expect(mockedCreateImagePostEntity$).toBeCalledTimes(1);
          expect(mockedAddImagePostImage$).toBeCalledTimes(1);
          expect(mockedStartCronProcessType).toBeCalledTimes(1);
          const [
            cronProcessType,
            _entityType,
            _entityId,
            _group,
            _slug,
            postSocialMedia,
          ] = mockedStartCronProcessType.mock.calls[0];
          expect(cronProcessType).toBe(CronProcessType.PublishEntity);
          expect(postSocialMedia).toBe(true);
          expect(mockedCreate$).toBeCalledTimes(1);
          done();
        });
    });
  });
});
