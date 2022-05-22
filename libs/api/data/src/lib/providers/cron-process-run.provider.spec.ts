/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { CronProcess } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { CronProcessRepositoryProvider } from './cron-process-repository.provider';
import { CronProcessRunProvider } from './cron-process-run.provider';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';
import { EntityDeleteProvider } from './entity-delete.provider';
import { EntityProcessProvider } from './entity-process.provider';
import { EntityPublishProvider } from './entity-publish.provider';

import { ImageAddBlobProvider } from './image-add-blob.provider';
import { ImageAddProvider } from './image-add.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageFindFolderProvider } from './image-find-folder.provider';
import { ImageProcessAllProvider } from './image-process-all.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImagePublishProvider } from './image-publish.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageUpdateNewProvider } from './image-update-new.provider';
import { ImageVideoEmailProvider } from './image-video-email.provider';
import { ImageVideoFfmpegExifProvider } from './image-video-ffmpeg-exif.provider';
import { ImageVideoFfmpegFrontCoverProvider } from './image-video-ffmpeg-front-cover.provider';
import { ImageVideoMeltProcessProvider } from './image-video-melt-process.provider';
import { ImageVideoMeltProvider } from './image-video-melt.provider';
import { ImageVideoPublishProvider } from './image-video-publish.provider';
import { SocialMediaPostProvider } from './social-media-post.provider';
import { WebSocketMessageProvider } from './web-socket-message.provider';

jest.mock('../cron-processes/cron-process-state.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-state.functions'),
}));
import * as cronProcessStateFunctions from '../cron-processes/cron-process-state.functions';

describe('cron-process-run.provider', () => {
  let cronProcessRunProvider: CronProcessRunProvider;
  let cronProcessStateUpdateProvider: CronProcessStateUpdateProvider;
  let entityDeleteProvider: EntityDeleteProvider;
  let entityPublishProvider: EntityPublishProvider;
  let imageUpdateNewProvider: ImageUpdateNewProvider;

  beforeEach(async () => {
    class MockConfigProvider {}
    class MockDocumentModel {}
    class MockCronProcessRepositoryProvider {}

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
          useClass: MockCronProcessRepositoryProvider,
        },
        CronProcessRunProvider,
        CronProcessStateUpdateProvider,
        EntityDeleteProvider,
        EntityPublishProvider,
        EntityProcessProvider,
        ImageAddBlobProvider,
        ImageAddProvider,
        ImageDeleteBlobsProvider,
        ImageExifProvider,
        ImageFindFolderProvider,
        ImageProcessAllProvider,
        ImageProcessOneProvider,
        ImagePublishProvider,
        ImageRemoveAllProvider,
        ImageRemoveOneProvider,
        ImageResizeProvider,
        ImageTinifyProvider,
        ImageUpdateNewProvider,
        ImageVideoEmailProvider,
        ImageVideoFfmpegExifProvider,
        ImageVideoFfmpegFrontCoverProvider,
        ImageVideoMeltProcessProvider,
        ImageVideoMeltProvider,
        ImageVideoPublishProvider,
        SocialMediaPostProvider,
        WebSocketMessageProvider,
      ],
    }).compile();

    cronProcessRunProvider = moduleRef.get<CronProcessRunProvider>(
      CronProcessRunProvider
    );
    cronProcessStateUpdateProvider =
      moduleRef.get<CronProcessStateUpdateProvider>(
        CronProcessStateUpdateProvider
      );
    entityDeleteProvider =
      moduleRef.get<EntityDeleteProvider>(EntityDeleteProvider);
    entityPublishProvider = moduleRef.get<EntityPublishProvider>(
      EntityPublishProvider
    );
    imageUpdateNewProvider = moduleRef.get<ImageUpdateNewProvider>(
      ImageUpdateNewProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteEntity$', () => {
    it('should set running, delete an entity, and set completed', (done: any) => {
      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessRunning = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessRunning')
        .mockReturnValue({ running: true } as Partial<CronProcessTable>);

      const mockedDeleteEntity$ = jest
        .spyOn(entityDeleteProvider, 'deleteEntity$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessCompleted = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessCompleted')
        .mockReturnValue({ completed: true } as Partial<CronProcessTable>);

      cronProcessRunProvider.isRunningCronProcess = true;
      cronProcessRunProvider.deleteEntity$({} as CronProcess).subscribe(() => {
        expect(mockedGetCronProcessRunning).toBeCalledTimes(1);
        expect(mockedDeleteEntity$).toBeCalledTimes(1);
        expect(mockedGetCronProcessCompleted).toBeCalledTimes(1);
        expect(mockedUpdateCronProcess$).toBeCalledTimes(2);
        const [_cronProcessFirstCall, cronProcessRunning] =
          mockedUpdateCronProcess$.mock.calls[0];
        expect(cronProcessRunning.running).toBe(true);
        const [_cronProcessSecondCall, cronProcessCompleted] =
          mockedUpdateCronProcess$.mock.calls[1];
        expect(cronProcessCompleted.completed).toBe(true);
        expect(cronProcessRunProvider.isRunningCronProcess).toBe(false);
        done();
      });
    });
  });

  describe('publishEntity$', () => {
    it('should set running, publish an entity, and set completed', (done: any) => {
      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessRunning = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessRunning')
        .mockReturnValue({ running: true } as Partial<CronProcessTable>);

      const mockedPublishEntity$ = jest
        .spyOn(entityPublishProvider, 'publishEntity$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessCompleted = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessCompleted')
        .mockReturnValue({ completed: true } as Partial<CronProcessTable>);

      cronProcessRunProvider.isRunningCronProcess = true;
      cronProcessRunProvider.publishEntity$({} as CronProcess).subscribe(() => {
        expect(mockedGetCronProcessRunning).toBeCalledTimes(1);
        expect(mockedPublishEntity$).toBeCalledTimes(1);
        expect(mockedGetCronProcessCompleted).toBeCalledTimes(1);
        expect(mockedUpdateCronProcess$).toBeCalledTimes(2);
        const [_cronProcessFirstCall, cronProcessRunning] =
          mockedUpdateCronProcess$.mock.calls[0];
        expect(cronProcessRunning.running).toBe(true);
        const [_cronProcessSecondCall, cronProcessCompleted] =
          mockedUpdateCronProcess$.mock.calls[1];
        expect(cronProcessCompleted.completed).toBe(true);
        expect(cronProcessRunProvider.isRunningCronProcess).toBe(false);
        done();
      });
    });
  });

  describe('updateNewImages$', () => {
    it('should set running, update new images, and set completed', (done: any) => {
      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessRunning = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessRunning')
        .mockReturnValue({ running: true } as Partial<CronProcessTable>);

      const mockedUpdateNewImages$ = jest
        .spyOn(imageUpdateNewProvider, 'updateNewImages$')
        .mockReturnValue(of(undefined));

      const mockedGetCronProcessCompleted = jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessCompleted')
        .mockReturnValue({ completed: true } as Partial<CronProcessTable>);

      cronProcessRunProvider.isRunningCronProcess = true;
      cronProcessRunProvider
        .updateNewImages$({} as drive_v3.Drive, {} as CronProcess)
        .subscribe(() => {
          expect(mockedGetCronProcessRunning).toBeCalledTimes(1);
          expect(mockedUpdateNewImages$).toBeCalledTimes(1);
          expect(mockedGetCronProcessCompleted).toBeCalledTimes(1);
          expect(mockedUpdateCronProcess$).toBeCalledTimes(2);
          const [_cronProcessFirstCall, cronProcessRunning] =
            mockedUpdateCronProcess$.mock.calls[0];
          expect(cronProcessRunning.running).toBe(true);
          const [_cronProcessSecondCall, cronProcessCompleted] =
            mockedUpdateCronProcess$.mock.calls[1];
          expect(cronProcessCompleted.completed).toBe(true);
          expect(cronProcessRunProvider.isRunningCronProcess).toBe(false);
          done();
        });
    });
  });
});
