/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { of } from 'rxjs';

import {
  CronProcess,
  DUMMY_CRON_PROCESS_ROW_KEY,
} from '@dark-rush-photography/shared/types';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';
import { AdminCronProcessesService } from './admin-cron-processes.service';

jest.mock('../cron-processes/cron-process-load.functions', () => ({
  ...jest.requireActual('../cron-processes/cron-process-load.functions'),
}));
import * as cronProcessLoadFunctions from '../cron-processes/cron-process-load.functions';

describe('admin-cron-processes.service', () => {
  let adminCronProcessesService: AdminCronProcessesService;
  const mockedCronProcessRepositoryProvider = {
    findAll$: jest.fn().mockReturnValue(of([] as CronProcess[])),
    findAllForRowKey$: jest.fn().mockReturnValue(of([] as CronProcess[])),
    delete$: jest.fn().mockReturnValue(of(undefined)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CronProcessRepositoryProvider.name,
          useValue: mockedCronProcessRepositoryProvider,
        },
        AdminCronProcessesService,
      ],
    }).compile();

    adminCronProcessesService = moduleRef.get<AdminCronProcessesService>(
      AdminCronProcessesService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll$', () => {
    it('should find all cron processes', (done: any) => {
      const mockedFindAll$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAll$')
        .mockReturnValue(of([{} as CronProcess] as CronProcess[]));

      const mockedLoadCronProcess = jest
        .spyOn(cronProcessLoadFunctions, 'loadCronProcess')
        .mockReturnValue({} as CronProcess);

      adminCronProcessesService.findAll$().subscribe((result) => {
        expect(mockedFindAll$).toBeCalledTimes(1);
        expect(mockedLoadCronProcess).toBeCalledTimes(1);
        expect(result).toHaveLength(1);
        done();
      });
    });

    it('should return an empty list when there are not any cron processes', (done: any) => {
      const mockedFindAll$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAll$')
        .mockReturnValue(of([] as CronProcess[]));

      const mockedLoadCronProcess = jest.spyOn(
        cronProcessLoadFunctions,
        'loadCronProcess'
      );

      adminCronProcessesService.findAll$().subscribe((result) => {
        expect(mockedFindAll$).toBeCalledTimes(1);
        expect(mockedLoadCronProcess).not.toBeCalled();
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('findOne$', () => {
    it('should find one cron process', (done: any) => {
      const mockedFindAllForRowKey$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAllForRowKey$')
        .mockReturnValue(of([{} as CronProcess] as CronProcess[]));

      const mockedLoadCronProcess = jest
        .spyOn(cronProcessLoadFunctions, 'loadCronProcess')
        .mockReturnValue({} as CronProcess);

      adminCronProcessesService
        .findOne$(DUMMY_CRON_PROCESS_ROW_KEY)
        .subscribe((result) => {
          expect(mockedFindAllForRowKey$).toBeCalledTimes(1);
          expect(mockedLoadCronProcess).toBeCalledTimes(1);
          expect(result).toBeDefined();
          done();
        });
    });

    it('should throw a not found exception when cron process is not found', (done: any) => {
      const mockedFindAllForRowKey$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAllForRowKey$')
        .mockReturnValue(of([] as CronProcess[]));

      const mockedLoadCronProcess = jest.spyOn(
        cronProcessLoadFunctions,
        'loadCronProcess'
      );

      adminCronProcessesService.findOne$(DUMMY_CRON_PROCESS_ROW_KEY).subscribe({
        next: () => {
          done();
        },
        error: (error) => {
          expect(mockedFindAllForRowKey$).toHaveBeenCalledTimes(1);
          expect(mockedLoadCronProcess).not.toHaveBeenCalled();
          expect(error).toBeInstanceOf(NotFoundException);
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should throw a conflict exception when more than one cron process found', (done: any) => {
      const mockedFindAllForRowKey$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAllForRowKey$')
        .mockReturnValue(
          of([{} as CronProcess, {} as CronProcess] as CronProcess[])
        );

      const mockedLoadCronProcess = jest.spyOn(
        cronProcessLoadFunctions,
        'loadCronProcess'
      );

      adminCronProcessesService.findOne$(DUMMY_CRON_PROCESS_ROW_KEY).subscribe({
        next: () => {
          done();
        },
        error: (error: ConflictException) => {
          expect(mockedFindAllForRowKey$).toHaveBeenCalledTimes(1);
          expect(mockedLoadCronProcess).not.toHaveBeenCalled();
          expect(error).toBeInstanceOf(ConflictException);
          expect(error.message).toBe(
            'More than one cron process found for row key'
          );
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('delete$', () => {
    it('should delete a cron process', (done: any) => {
      const mockedFindAllForRowKey$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAllForRowKey$')
        .mockReturnValue(of([{} as CronProcess] as CronProcess[]));

      const mockedDelete$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'delete$')
        .mockReturnValue(of(undefined));

      adminCronProcessesService
        .delete$(DUMMY_CRON_PROCESS_ROW_KEY)
        .subscribe(() => {
          expect(mockedFindAllForRowKey$).toBeCalledTimes(1);
          expect(mockedDelete$).toBeCalledTimes(1);
          done();
        });
    });

    it('should not delete a cron process when cron process is not found', (done: any) => {
      const mockedFindAllForRowKey$ = jest
        .spyOn(mockedCronProcessRepositoryProvider, 'findAllForRowKey$')
        .mockReturnValue(of([] as CronProcess[]));

      const mockedDelete$ = jest.spyOn(
        mockedCronProcessRepositoryProvider,
        'delete$'
      );

      adminCronProcessesService
        .delete$(DUMMY_CRON_PROCESS_ROW_KEY)
        .subscribe(() => {
          expect(mockedFindAllForRowKey$).toBeCalledTimes(1);
          expect(mockedDelete$).not.toHaveBeenCalled();
          done();
        });
    });
  });
});
