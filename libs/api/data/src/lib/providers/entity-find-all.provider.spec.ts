/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import {
  EntityAdmin,
  EntityType,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { EntityFindAllProvider } from './entity-find-all.provider';

jest.mock('@dark-rush-photography/shared/util', () => ({
  ...jest.requireActual('@dark-rush-photography/shared/util'),
}));
import * as sharedUtil from '@dark-rush-photography/shared/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-load-admin.functions', () => ({
  ...jest.requireActual('../entities/entity-load-admin.functions'),
}));
import * as entityLoadAdminFunctions from '../entities/entity-load-admin.functions';

describe('entity-find-all.provider', () => {
  let entityFindAllProvider: EntityFindAllProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityFindAllProvider,
      ],
    }).compile();

    entityFindAllProvider = moduleRef.get<EntityFindAllProvider>(
      EntityFindAllProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllEntities$', () => {
    it('should find watermarked and without watermark entities', (done: any) => {
      const mockedGetEntityTypeFromEntityWithoutGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithoutGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const watermarkedEntity = {
        pathname: faker.lorem.word(),
      } as DocumentModel;
      const withoutWatermarkEntity = {
        pathname: faker.lorem.word(),
      } as DocumentModel;

      const mockedFindAllEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntities$')
        .mockReturnValueOnce(of([watermarkedEntity]))
        .mockReturnValueOnce(of([withoutWatermarkEntity]));

      const mockedLoadEntityAdmin = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockImplementation(
          (documentModel: DocumentModel) => documentModel as EntityAdmin
        );

      entityFindAllProvider
        .findAllEntities$(
          faker.random.arrayElement(
            Object.values(EntityWithoutGroupType).filter(
              (entityWithoutGroupType) =>
                entityWithoutGroupType !== EntityWithoutGroupType.Test
            )
          )
        )
        .subscribe((result) => {
          expect(mockedGetEntityTypeFromEntityWithoutGroupType).toBeCalledTimes(
            2
          );
          expect(mockedFindAllEntities$).toBeCalledTimes(2);
          expect(mockedLoadEntityAdmin).toBeCalledTimes(2);
          expect(result).toEqual([
            { ...watermarkedEntity },
            { ...withoutWatermarkEntity },
          ]);
          done();
        });
    });

    it('should return an empty array if entities are not found', (done: any) => {
      const mockedGetEntityTypeFromEntityWithoutGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithoutGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedFindAllEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntities$')
        .mockReturnValue(of([]));

      const mockedLoadEntityAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityAdmin'
      );

      entityFindAllProvider
        .findAllEntities$(
          faker.random.arrayElement(
            Object.values(EntityWithoutGroupType).filter(
              (entityWithoutGroupType) =>
                entityWithoutGroupType !== EntityWithoutGroupType.Test
            )
          )
        )
        .subscribe((result) => {
          expect(mockedGetEntityTypeFromEntityWithoutGroupType).toBeCalledTimes(
            2
          );
          expect(mockedFindAllEntities$).toBeCalledTimes(2);
          expect(mockedLoadEntityAdmin).not.toBeCalled();
          expect(result).toHaveLength(0);
          done();
        });
    });

    it('should find all entities for Test entity', (done: any) => {
      const mockedFindAllTestEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllTestEntities$')
        .mockReturnValue(of([{} as DocumentModel, {} as DocumentModel]));

      const mockedLoadEntityAdmin = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockImplementation(
          (documentModel: DocumentModel) => documentModel as EntityAdmin
        );

      const mockedGetEntityTypeFromEntityWithoutGroupType = jest.spyOn(
        sharedUtil,
        'getEntityTypeFromEntityWithoutGroupType'
      );

      const mockedFindAllEntities$ = jest.spyOn(
        entityRepositoryFunctions,
        'findAllEntities$'
      );

      entityFindAllProvider
        .findAllEntities$(EntityWithoutGroupType.Test)
        .subscribe((result) => {
          expect(mockedFindAllTestEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityAdmin).toBeCalledTimes(2);
          expect(
            mockedGetEntityTypeFromEntityWithoutGroupType
          ).not.toBeCalled();
          expect(mockedFindAllEntities$).not.toBeCalled();
          expect(result.length).toBe(2);
          done();
        });
    });

    it('should return an empty array for Test entity if entities are not found', (done: any) => {
      const mockedFindAllTestEntities$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllTestEntities$')
        .mockReturnValue(of([]));

      const mockedLoadEntityAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityAdmin'
      );

      const mockedGetEntityTypeFromEntityWithoutGroupType = jest.spyOn(
        sharedUtil,
        'getEntityTypeFromEntityWithoutGroupType'
      );

      const mockedFindAllEntities$ = jest.spyOn(
        entityRepositoryFunctions,
        'findAllEntities$'
      );

      entityFindAllProvider
        .findAllEntities$(EntityWithoutGroupType.Test)
        .subscribe((result) => {
          expect(mockedFindAllTestEntities$).toBeCalledTimes(1);
          expect(mockedLoadEntityAdmin).not.toBeCalled();
          expect(
            mockedGetEntityTypeFromEntityWithoutGroupType
          ).not.toBeCalled();
          expect(mockedFindAllEntities$).not.toBeCalled();
          expect(result.length).toBe(0);
          done();
        });
    });
  });

  describe('findAllEntitiesForGroup$', () => {
    it('should find watermarked and without watermark entities for a group', (done: any) => {
      const mockedGetEntityTypeFromEntityWithGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const watermarkedEntity = {
        pathname: faker.lorem.word(),
      } as DocumentModel;
      const withoutWatermarkEntity = {
        pathname: faker.lorem.word(),
      } as DocumentModel;

      const mockedFindAllEntitiesForWatermarkedGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForWatermarkedGroup$')
        .mockReturnValueOnce(of([watermarkedEntity]))
        .mockReturnValueOnce(of([withoutWatermarkEntity]));

      const mockedLoadEntityAdmin = jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityAdmin')
        .mockImplementation(
          (documentModel: DocumentModel) => documentModel as EntityAdmin
        );

      entityFindAllProvider
        .findAllEntitiesForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(mockedGetEntityTypeFromEntityWithGroupType).toBeCalledTimes(2);
          expect(mockedFindAllEntitiesForWatermarkedGroup$).toBeCalledTimes(2);
          expect(mockedLoadEntityAdmin).toBeCalledTimes(2);
          expect(result).toEqual([
            { ...watermarkedEntity },
            { ...withoutWatermarkEntity },
          ]);
          done();
        });
    });

    it('should return an empty array if entities are not found for a group', (done: any) => {
      const mockedGetEntityTypeFromEntityWithGroupType = jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));

      const mockedFindAllEntitiesForWatermarkedGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForWatermarkedGroup$')
        .mockReturnValue(of([]));

      const mockedLoadEntityAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityAdmin'
      );

      entityFindAllProvider
        .findAllEntitiesForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(mockedGetEntityTypeFromEntityWithGroupType).toBeCalledTimes(2);
          expect(mockedFindAllEntitiesForWatermarkedGroup$).toBeCalledTimes(2);
          expect(mockedLoadEntityAdmin).not.toBeCalled();
          expect(result).toHaveLength(0);
          done();
        });
    });
  });
});
