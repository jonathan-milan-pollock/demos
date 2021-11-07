/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { CronProcessRunProvider } from './cron-process-run.provider';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';
import { CronProcessRepositoryProvider } from './cron-process-repository.provider';
import { EntityDeleteProvider } from './entity-delete.provider';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';
import { EntityPublishProvider } from './entity-publish.provider';
import { ImageProcessAllProvider } from './image-process-all.provider';
import { ImageProcessOneProvider } from './image-process-one.provider';
import { ImageExifProvider } from './image-exif.provider';
import { ImageTinifyProvider } from './image-tinify.provider';
import { ImageResizeProvider } from './image-resize.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';
import { ImagePublishProvider } from './image-publish.provider';
import { ImageVideoEmailProvider } from './image-video-email.provider';
import { SocialMediaPostProvider } from './social-media-post.provider';
import { ImageUpdateNewProvider } from './image-update-new.provider';
import { ImageFindFolderProvider } from './image-find-folder.provider';
import { ImageAddProvider } from './image-add.provider';
import { WebSocketMessageProvider } from './web-socket-message.provider';
import { CronProcessProvider } from './cron-process.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../cron-processes/cron-process-state.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-state.functions'),
}));
import * as cronProcessStateFunctions from '../cron-processes/cron-process-state.functions';

import { CronProcessTable } from '../tables/cron-process.table';
import { CronProcessType } from '@dark-rush-photography/shared/types';

describe('cron-process.provider', () => {
  let cronProcessProvider: CronProcessProvider;
  let cronProcessRunProvider: CronProcessRunProvider;
  let cronProcessStateUpdateProvider: CronProcessStateUpdateProvider;

  const mockedCronProcessRepositoryProvider = {
    firstReady$: jest.fn().mockReturnValue(of({} as CronProcessTable)),
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
        CronProcessProvider,
        CronProcessRunProvider,
        CronProcessStateUpdateProvider,
        EntityDeleteProvider,
        ImageRemoveAllProvider,
        ImageRemoveOneProvider,
        ImageDeleteBlobsProvider,
        EntityPublishProvider,
        ImageProcessAllProvider,
        ImageProcessOneProvider,
        ImageExifProvider,
        ImageTinifyProvider,
        ImageResizeProvider,
        ImageAddBlobProvider,
        ImagePublishProvider,
        ImageVideoEmailProvider,
        SocialMediaPostProvider,
        ImageUpdateNewProvider,
        ImageFindFolderProvider,
        ImageAddProvider,
        WebSocketMessageProvider,
      ],
    }).compile();

    cronProcessProvider =
      moduleRef.get<CronProcessProvider>(CronProcessProvider);
    cronProcessRunProvider = moduleRef.get<CronProcessRunProvider>(
      CronProcessRunProvider
    );
    cronProcessStateUpdateProvider =
      moduleRef.get<CronProcessStateUpdateProvider>(
        CronProcessStateUpdateProvider
      );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('runCronProcesses', () => {
    it('should not call delete, publish, or update new images when cron process type is not found', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: {} as CronProcessType } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedDeleteEntity$ = jest
        .spyOn(cronProcessRunProvider, 'deleteEntity$')
        .mockReturnValue(of(undefined));
      const mockedPublishEntity$ = jest
        .spyOn(cronProcessRunProvider, 'publishEntity$')
        .mockReturnValue(of(undefined));
      const mockedUpdateNewImages$ = jest
        .spyOn(cronProcessRunProvider, 'updateNewImages$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedDeleteEntity$).not.toBeCalled();
      expect(mockedPublishEntity$).not.toBeCalled();
      expect(mockedUpdateNewImages$).not.toBeCalled();
      expect(cronProcessRunProvider.isRunningCronProcess).toBe(false);
    });

    it('should delete entity', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.DeleteEntity } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedDeleteEntity$ = jest
        .spyOn(cronProcessRunProvider, 'deleteEntity$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedDeleteEntity$).toBeCalledTimes(1);
      expect(cronProcessRunProvider.isRunningCronProcess).toBe(true);
    });

    it('should publish entity', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.PublishEntity } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedPublishEntity$ = jest
        .spyOn(cronProcessRunProvider, 'publishEntity$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedPublishEntity$).toBeCalledTimes(1);
      expect(cronProcessRunProvider.isRunningCronProcess).toBe(true);
    });

    it('should update new images', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.UpdateNewImages } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedUpdateNewImages$ = jest
        .spyOn(cronProcessRunProvider, 'updateNewImages$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedUpdateNewImages$).toBeCalledTimes(1);
      expect(cronProcessRunProvider.isRunningCronProcess).toBe(true);
    });

    it('should report error when entity is not found', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValue(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(of({} as CronProcessTable));

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessError')
        .mockReturnValue({ error: true } as Partial<CronProcessTable>);

      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedFindEntityById$).toBeCalledTimes(1);
      expect(mockedUpdateCronProcess$).toBeCalledTimes(1);
      const [_cronProcessFirstCall, cronProcessError] =
        mockedUpdateCronProcess$.mock.calls[0];
      expect(cronProcessError.error).toBe(true);
    });

    it('should not run when cron processes are not ready', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValue(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(of(undefined));

      const mockedFindEntityById$ = jest.spyOn(
        entityRepositoryFunctions,
        'findEntityById$'
      );

      await cronProcessProvider.runCronProcesses();

      expect(mockedCronProcessRepositoryProvider.firstReady$).toBeCalledTimes(
        1
      );
      expect(mockedFindEntityById$).not.toBeCalled();
    });

    it('should not run when processes are already running', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      const mockedIsRunningCronProcess = jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValue(true);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedIsRunningCronProcess).toBeCalledTimes(1);
      expect(mockedCronProcessRepositoryProvider.firstReady$).not.toBeCalled();
    });

    it('should report an error when delete entity fails', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.DeleteEntity } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedDeleteEntity$ = jest
        .spyOn(cronProcessRunProvider, 'deleteEntity$')
        .mockImplementation(() => {
          throw new Error();
        });

      jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessError')
        .mockReturnValue({ error: true } as Partial<CronProcessTable>);

      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedDeleteEntity$).toBeCalledTimes(1);
      expect(mockedUpdateCronProcess$).toBeCalledTimes(1);
      const [_cronProcessFirstCall, cronProcessError] =
        mockedUpdateCronProcess$.mock.calls[0];
      expect(cronProcessError.error).toBe(true);
    });

    it('should report an error when publish entity fails', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.PublishEntity } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedPublishEntity$ = jest
        .spyOn(cronProcessRunProvider, 'publishEntity$')
        .mockImplementation(() => {
          throw new Error();
        });

      jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessError')
        .mockReturnValue({ error: true } as Partial<CronProcessTable>);

      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedPublishEntity$).toBeCalledTimes(1);
      expect(mockedUpdateCronProcess$).toBeCalledTimes(1);
      const [_cronProcessFirstCall, cronProcessError] =
        mockedUpdateCronProcess$.mock.calls[0];
      expect(cronProcessError.error).toBe(true);
    });

    it('should report an error when update new images fails', async () => {
      jest
        .spyOn(apiUtil, 'getGoogleDrive')
        .mockReturnValue({} as drive_v3.Drive);

      jest
        .spyOn(cronProcessRunProvider, 'isRunningCronProcess', 'get')
        .mockReturnValueOnce(false);

      mockedCronProcessRepositoryProvider.firstReady$ = jest
        .fn()
        .mockReturnValue(
          of({ type: CronProcessType.UpdateNewImages } as CronProcessTable)
        );

      jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedUpdateNewImages$ = jest
        .spyOn(cronProcessRunProvider, 'updateNewImages$')
        .mockImplementation(() => {
          throw new Error();
        });

      jest
        .spyOn(cronProcessStateFunctions, 'getCronProcessError')
        .mockReturnValue({ error: true } as Partial<CronProcessTable>);

      const mockedUpdateCronProcess$ = jest
        .spyOn(cronProcessStateUpdateProvider, 'updateCronProcess$')
        .mockReturnValue(of(undefined));

      await cronProcessProvider.runCronProcesses();

      expect(mockedUpdateNewImages$).toBeCalledTimes(1);
      expect(mockedUpdateCronProcess$).toBeCalledTimes(1);
      const [_cronProcessFirstCall, cronProcessError] =
        mockedUpdateCronProcess$.mock.calls[0];
      expect(cronProcessError.error).toBe(true);
    });
  });
});
