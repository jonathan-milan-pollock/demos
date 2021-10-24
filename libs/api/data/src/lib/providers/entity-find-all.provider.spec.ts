/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
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
          useValue: new MockDocumentModel(),
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
    beforeEach(() => {
      jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithoutGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));
    });

    it('should find watermarked and without watermark entities', (done: any) => {
      const watermarkedEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;
      const withoutWatermarkEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;

      jest
        .spyOn(entityRepositoryFunctions, 'findAllEntities$')
        .mockReturnValueOnce(of([watermarkedEntity]))
        .mockReturnValueOnce(of([withoutWatermarkEntity]));

      jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityMinimalAdmin')
        .mockImplementation(
          (documentModel: DocumentModel) =>
            ({ slug: documentModel.slug } as EntityMinimalAdmin)
        );

      entityFindAllProvider
        .findAllEntities$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(result).toEqual([
            { ...watermarkedEntity },
            { ...withoutWatermarkEntity },
          ]);
          done();
        });
    });

    it('should return an empty array if entities are not found', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findAllEntities$')
        .mockReturnValue(of([]));

      const mockedLoadEntityMinimalAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityMinimalAdmin'
      );

      entityFindAllProvider
        .findAllEntities$(
          faker.random.arrayElement(Object.values(EntityWithoutGroupType))
        )
        .subscribe((result) => {
          expect(result).toHaveLength(0);
          expect(mockedLoadEntityMinimalAdmin).not.toBeCalled();
          done();
        });
    });
  });

  describe('findAllEntitiesForGroup$', () => {
    beforeEach(() => {
      jest
        .spyOn(sharedUtil, 'getEntityTypeFromEntityWithGroupType')
        .mockReturnValue(faker.random.arrayElement(Object.values(EntityType)));
    });

    it('should find watermarked and without watermark entities for a group', (done: any) => {
      const watermarkedEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;
      const withoutWatermarkEntity = {
        slug: faker.lorem.word(),
      } as DocumentModel;

      jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValueOnce(of([watermarkedEntity]))
        .mockReturnValueOnce(of([withoutWatermarkEntity]));

      jest
        .spyOn(entityLoadAdminFunctions, 'loadEntityMinimalAdmin')
        .mockImplementation(
          (documentModel: DocumentModel) =>
            ({ slug: documentModel.slug } as EntityMinimalAdmin)
        );

      entityFindAllProvider
        .findAllEntitiesForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(result).toEqual([
            { ...watermarkedEntity },
            { ...withoutWatermarkEntity },
          ]);
          done();
        });
    });

    it('should return an empty array if entities are not found for a group', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([]));

      const mockedLoadEntityMinimalAdmin = jest.spyOn(
        entityLoadAdminFunctions,
        'loadEntityMinimalAdmin'
      );

      entityFindAllProvider
        .findAllEntitiesForGroup$(
          faker.random.arrayElement(Object.values(EntityWithGroupType)),
          faker.lorem.word()
        )
        .subscribe((result) => {
          expect(result).toHaveLength(0);
          expect(mockedLoadEntityMinimalAdmin).not.toBeCalled();
          done();
        });
    });
  });
});
