/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { EntityCreateOneForFolderProvider } from './entity-create-one-for-folder.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('entity-create-one-for-folder.provider', () => {
  let entityCreateOneForFolderProvider: EntityCreateOneForFolderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityCreateOneForFolderProvider,
      ],
    }).compile();

    entityCreateOneForFolderProvider =
      moduleRef.get<EntityCreateOneForFolderProvider>(
        EntityCreateOneForFolderProvider
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOneEntityForFolder$', () => {
    it('should create one entity for a folder', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLogFoundEntityMessage = jest.spyOn(
        apiUtil,
        'logFoundEntityMessage'
      );

      const mockedLogCreatingEntityMessage = jest
        .spyOn(apiUtil, 'logCreatingEntityMessage')
        .mockReturnValue(undefined);

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          {} as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedLogFoundEntityMessage).not.toHaveBeenCalled();
          expect(mockedLogCreatingEntityMessage).toHaveBeenCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should create one entity with order of 1 when no documents are found for group', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLogFoundEntityMessage = jest.spyOn(
        apiUtil,
        'logFoundEntityMessage'
      );

      const mockedLogCreatingEntityMessage = jest
        .spyOn(apiUtil, 'logCreatingEntityMessage')
        .mockReturnValue(undefined);

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          {} as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedLogFoundEntityMessage).not.toHaveBeenCalled();
          expect(mockedLogCreatingEntityMessage).toHaveBeenCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).toHaveBeenCalledTimes(1);
          const [
            _entityType,
            _googleDriveFolderId,
            _watermarkedType,
            _group,
            _slug,
            order,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(order).toBe(1);
          done();
        });
    });

    it('should create one entity with max order plus 1 when documents are found for group', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLogFoundEntityMessage = jest.spyOn(
        apiUtil,
        'logFoundEntityMessage'
      );

      const mockedLogCreatingEntityMessage = jest
        .spyOn(apiUtil, 'logCreatingEntityMessage')
        .mockReturnValue(undefined);

      const documentModelOrder = faker.datatype.number({ min: 1 });
      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(
          of([
            {
              order: documentModelOrder,
            },
          ] as DocumentModel[])
        );

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          {} as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedLogFoundEntityMessage).not.toHaveBeenCalled();
          expect(mockedLogCreatingEntityMessage).toHaveBeenCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).toHaveBeenCalledTimes(1);
          const [
            _entityType,
            _googleDriveFolderId,
            _watermarkedType,
            _group,
            _slug,
            order,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(order).toBe(documentModelOrder + 1);
          done();
        });
    });

    it('should not create one entity for a folder if it already exists', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedFoundEntityLogMessage = jest
        .spyOn(apiUtil, 'logFoundEntityMessage')
        .mockReturnValue(undefined);

      const mockedLogCreatingEntityMessage = jest.spyOn(
        apiUtil,
        'logCreatingEntityMessage'
      );

      const mockedFindAllEntitiesForGroup$ = jest.spyOn(
        entityRepositoryFunctions,
        'findAllEntitiesForGroup$'
      );

      const mockedCreateEntityForFolder$ = jest.spyOn(
        entityRepositoryFunctions,
        'createEntityForFolder$'
      );

      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          {} as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedFoundEntityLogMessage).toHaveBeenCalledTimes(1);
          expect(mockedLogCreatingEntityMessage).not.toHaveBeenCalled();
          expect(mockedFindAllEntitiesForGroup$).not.toHaveBeenCalled();
          expect(mockedCreateEntityForFolder$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should create an entity with the folder name when the initial slug is not provided', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLogFoundEntityMessage = jest.spyOn(
        apiUtil,
        'logFoundEntityMessage'
      );

      const mockedLogCreatingEntityMessage = jest
        .spyOn(apiUtil, 'logCreatingEntityMessage')
        .mockReturnValue(undefined);

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      const folderName = faker.lorem.word();
      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          { id: faker.datatype.uuid(), name: folderName } as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedLogFoundEntityMessage).not.toHaveBeenCalled();
          expect(mockedLogCreatingEntityMessage).toHaveBeenCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).toHaveBeenCalledTimes(1);
          const [
            _entityType,
            _googleDriveFolderId,
            _watermarkedType,
            _group,
            slug,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(slug).toBe(folderName);
          done();
        });
    });

    it('should create an entity with the initial slug when the initial slug is provided', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLogFoundEntityMessage = jest.spyOn(
        apiUtil,
        'logFoundEntityMessage'
      );

      const mockedLogCreatingEntityMessage = jest
        .spyOn(apiUtil, 'logCreatingEntityMessage')
        .mockReturnValue(undefined);

      const mockedFindAllEntitiesForGroup$ = jest
        .spyOn(entityRepositoryFunctions, 'findAllEntitiesForGroup$')
        .mockReturnValue(of([] as DocumentModel[]));

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      const initialSlug = faker.lorem.word();
      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          {
            id: faker.datatype.uuid(),
            name: faker.lorem.word(),
          } as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word(),
          initialSlug
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalledTimes(1);
          expect(mockedLogFoundEntityMessage).not.toHaveBeenCalled();
          expect(mockedLogCreatingEntityMessage).toHaveBeenCalledTimes(1);
          expect(mockedFindAllEntitiesForGroup$).toHaveBeenCalledTimes(1);
          expect(mockedCreateEntityForFolder$).toHaveBeenCalledTimes(1);
          const [
            _entityType,
            _googleDriveFolderId,
            _watermarkedType,
            _group,
            slug,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(slug).toBe(initialSlug);
          done();
        });
    });
  });
});
