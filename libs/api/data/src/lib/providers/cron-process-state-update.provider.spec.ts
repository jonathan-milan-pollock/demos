/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';

import { of } from 'rxjs';

import { WebSocketCronProcessResponse } from '@dark-rush-photography/shared/types';
import { CronProcessTable } from '../tables/cron-process.table';

import { CronProcessRepositoryProvider } from './cron-process-repository.provider';
import { WebSocketMessageProvider } from './web-socket-message.provider';
import { CronProcessStateUpdateProvider } from './cron-process-state-update.provider';

jest.mock('../cron-processes/cron-process-load.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-load.functions'),
}));
import * as cronProcessLoadFunctions from '../cron-processes/cron-process-load.functions';

jest.mock(
  '../cron-processes/web-socket-load-cron-process-response.functions',
  () => ({
    ...jest.requireActual(
      '../cron-processes/web-socket-load-cron-process-response.functions'
    ),
  })
);
import * as webSocketCronProcessResponseFunctions from '../cron-processes/web-socket-load-cron-process-response.functions';

describe('cron-process-state-update.provider', () => {
  let cronProcessStateUpdateProvider: CronProcessStateUpdateProvider;
  let webSocketMessageProvider: WebSocketMessageProvider;

  const mockedCronProcessRepositoryProvider = {
    update$: jest.fn().mockReturnValue(of(undefined)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CronProcessRepositoryProvider.name,
          useValue: mockedCronProcessRepositoryProvider,
        },
        CronProcessStateUpdateProvider,
        WebSocketMessageProvider,
      ],
    }).compile();

    cronProcessStateUpdateProvider =
      moduleRef.get<CronProcessStateUpdateProvider>(
        CronProcessStateUpdateProvider
      );
    webSocketMessageProvider = moduleRef.get<WebSocketMessageProvider>(
      WebSocketMessageProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateCronProcess$', () => {
    it('should update repository and send web socket message', (done: any) => {
      const mockedLoadCronProcessUpdate = jest
        .spyOn(cronProcessLoadFunctions, 'loadCronProcessUpdate')
        .mockReturnValue({} as CronProcessTable);

      const mockedLoadCronProcessWebSocketUpdate = jest
        .spyOn(
          webSocketCronProcessResponseFunctions,
          'loadWebSocketCronProcessResponse'
        )
        .mockReturnValue({} as WebSocketCronProcessResponse);

      const mockedSendMessage$ = jest
        .spyOn(webSocketMessageProvider, 'sendMessage$')
        .mockReturnValue(of(undefined));

      cronProcessStateUpdateProvider
        .updateCronProcess$(
          {} as CronProcessTable,
          {} as Partial<CronProcessTable>
        )
        .subscribe(() => {
          expect(mockedLoadCronProcessUpdate).toBeCalledTimes(1);
          expect(mockedCronProcessRepositoryProvider.update$).toBeCalledTimes(
            1
          );
          expect(mockedLoadCronProcessWebSocketUpdate).toBeCalledTimes(1);
          expect(mockedSendMessage$).toBeCalledTimes(1);
          done();
        });
    });
  });
});
