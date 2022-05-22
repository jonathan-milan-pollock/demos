/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
  JsonLdList,
  JsonLdNewsArticle,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { EntityFindPublicProvider } from './entity-find-public.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-load-public.functions', () => ({
  ...jest.requireActual('../entities/entity-load-public.functions'),
}));
import * as entityLoadPublicFunctions from '../entities/entity-load-public.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

jest.mock('../entities/entity-json-ld.functions', () => ({
  ...jest.requireActual('../entities/entity-json-ld.functions'),
}));
import * as entityJsonLdFunctions from '../entities/entity-json-ld.functions';

describe('entity-find-public.provider', () => {
  let entityFindPublicProvider: EntityFindPublicProvider;

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
        EntityFindPublicProvider,
      ],
    }).compile();

    entityFindPublicProvider = moduleRef.get<EntityFindPublicProvider>(
      EntityFindPublicProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllPublicEntities$', () => {
    it('should find all public entities', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([{} as DocumentModel, {} as DocumentModel] as DocumentModel[])
        );

      const mockedLoadEntityMinimalPublic = jest
        .spyOn(entityLoadPublicFunctions, 'loadEntityMinimalPublic')
        .mockReturnValue({} as EntityMinimalPublic);

      const mockedLoadEventsJsonLdList = jest.spyOn(
        entityJsonLdFunctions,
        'loadEventsJsonLdList'
      );

      entityFindPublicProvider
        .findAllPublicEntities$(
          faker.random.arrayElement(
            Object.values(EntityType).filter(
              (entityType) => entityType !== EntityType.Event
            )
          )
        )
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityMinimalPublic).toBeCalledTimes(2);
          expect(mockedLoadEventsJsonLdList).not.toBeCalled();
          expect(result.minimalPublicEntities.length).toBe(2);
          expect(result.eventsJsonLdList).toBeUndefined();
          done();
        });
    });

    it('should load events json-ld when find all public entities for events', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(
          of([{} as DocumentModel, {} as DocumentModel] as DocumentModel[])
        );

      const mockedLoadEntityMinimalPublic = jest
        .spyOn(entityLoadPublicFunctions, 'loadEntityMinimalPublic')
        .mockReturnValue({} as EntityMinimalPublic);

      const mockedLoadEventsJsonLdList = jest
        .spyOn(entityJsonLdFunctions, 'loadEventsJsonLdList')
        .mockReturnValue({} as JsonLdList);

      entityFindPublicProvider
        .findAllPublicEntities$(EntityType.Event)
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityMinimalPublic).toBeCalledTimes(2);
          expect(mockedLoadEventsJsonLdList).toBeCalledTimes(1);
          expect(result.minimalPublicEntities.length).toBe(2);
          expect(result.eventsJsonLdList).toBeDefined();
          done();
        });
    });

    it('should return an empty array if entities are not found', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedLoadEntityMinimalPublic = jest.spyOn(
        entityLoadPublicFunctions,
        'loadEntityMinimalPublic'
      );

      const mockedLoadEventsJsonLdList = jest.spyOn(
        entityJsonLdFunctions,
        'loadEventsJsonLdList'
      );

      entityFindPublicProvider
        .findAllPublicEntities$(
          faker.random.arrayElement(
            Object.values(EntityType).filter(
              (entityType) => entityType != EntityType.Event
            )
          )
        )
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityMinimalPublic).not.toBeCalled();
          expect(mockedLoadEventsJsonLdList).not.toBeCalled();
          expect(result.minimalPublicEntities.length).toBe(0);
          expect(result.eventsJsonLdList).toBeUndefined();
          done();
        });
    });

    it('should return an empty array and events json-ld if events are not found', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllPublicEntities$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedLoadEntityMinimalPublic = jest.spyOn(
        entityLoadPublicFunctions,
        'loadEntityMinimalPublic'
      );

      const mockedLoadEventsJsonLdList = jest
        .spyOn(entityJsonLdFunctions, 'loadEventsJsonLdList')
        .mockReturnValue({} as JsonLdList);

      entityFindPublicProvider
        .findAllPublicEntities$(EntityType.Event)
        .subscribe((result) => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityMinimalPublic).not.toBeCalled();
          expect(mockedLoadEventsJsonLdList).toBeCalledTimes(1);
          expect(result.minimalPublicEntities.length).toBe(0);
          expect(result.eventsJsonLdList).toBeDefined();
          done();
        });
    });
  });

  describe('findOnePublicEntity$', () => {
    it('should find one public entity', (done: any) => {
      const mockedFindPublicEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findPublicEntityById$')
        .mockReturnValue(
          of({
            type: faker.random.arrayElement(
              Object.values(EntityType).filter(
                (entityType) => entityType != EntityType.Event
              )
            ),
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadEntityPublic = jest
        .spyOn(entityLoadPublicFunctions, 'loadEntityPublic')
        .mockReturnValue({} as EntityPublic);

      const mockedLoadEventJsonLdNewsArticle = jest.spyOn(
        entityJsonLdFunctions,
        'loadEventJsonLdNewsArticle'
      );

      entityFindPublicProvider
        .findOnePublicEntity$(DUMMY_MONGODB_ID)
        .subscribe((result) => {
          expect(mockedFindPublicEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadEntityPublic).toBeCalledTimes(1);
          expect(mockedLoadEventJsonLdNewsArticle).not.toBeCalled();
          expect(result.publicEntity).toBeDefined();
          expect(result.eventJsonLdNewsArticle).toBeUndefined();
          done();
        });
    });

    it('should load event json-ld when find one public event', (done: any) => {
      const mockedFindPublicEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findPublicEntityById$')
        .mockReturnValue(
          of({
            type: EntityType.Event,
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedLoadEntityPublic = jest
        .spyOn(entityLoadPublicFunctions, 'loadEntityPublic')
        .mockReturnValue({} as EntityPublic);

      const mockedLoadEventJsonLdNewsArticle = jest
        .spyOn(entityJsonLdFunctions, 'loadEventJsonLdNewsArticle')
        .mockReturnValue({} as JsonLdNewsArticle);

      entityFindPublicProvider
        .findOnePublicEntity$(DUMMY_MONGODB_ID)
        .subscribe((result) => {
          expect(mockedFindPublicEntityById$).toBeCalledTimes(1);
          expect(mockedValidateEntityFound).toBeCalledTimes(1);
          expect(mockedLoadEntityPublic).toBeCalledTimes(1);
          expect(mockedLoadEventJsonLdNewsArticle).toBeCalledTimes(1);
          expect(result.publicEntity).toBeDefined();
          expect(result.eventJsonLdNewsArticle).toBeDefined();
          done();
        });
    });

    it('should throw a not found exception when entity is not found', (done: any) => {
      const mockedFindPublicEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findPublicEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedLoadEntityPublic = jest.spyOn(
        entityLoadPublicFunctions,
        'loadEntityPublic'
      );

      const mockedLoadEventJsonLdNewsArticle = jest.spyOn(
        entityJsonLdFunctions,
        'loadEventJsonLdNewsArticle'
      );

      entityFindPublicProvider
        .findOnePublicEntity$(DUMMY_MONGODB_ID)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindPublicEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedLoadEntityPublic).not.toBeCalled();
            expect(mockedLoadEventJsonLdNewsArticle).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
