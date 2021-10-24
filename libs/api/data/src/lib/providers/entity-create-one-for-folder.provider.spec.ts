/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { EntityCreateOneForFolderProvider } from './entity-create-one-for-folder.provider';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';
import { DocumentModel } from '../schema/document.schema';

describe('entity-create-one-for-folder.provider', () => {
  let entityCreateOneForFolderProvider: EntityCreateOneForFolderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useValue: new MockDocumentModel(),
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
    it('should create an entity for a folder', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedFoundEntityLogMessage = jest
        .spyOn(apiUtil, 'foundEntityLogMessage')
        .mockReturnValue(faker.lorem.sentence());

      const creatingEntityLogMessage = jest
        .spyOn(apiUtil, 'creatingEntityLogMessage')
        .mockReturnValue(faker.lorem.sentence());

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
          expect(mockedFoundEntityLogMessage).not.toHaveBeenCalled();
          expect(creatingEntityLogMessage).toHaveBeenCalled();
          expect(mockedCreateEntityForFolder$).toHaveBeenCalled();
          done();
        });
    });

    it('should not create an entity for a folder if it already exists', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedFoundEntityLogMessage = jest
        .spyOn(apiUtil, 'foundEntityLogMessage')
        .mockReturnValue(faker.lorem.sentence());

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
          expect(mockedFoundEntityLogMessage).toHaveBeenCalled();
          expect(mockedCreateEntityForFolder$).not.toHaveBeenCalled();
          done();
        });
    });

    it('should create an entity with the folder name if the initial slug is not provided', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      jest
        .spyOn(apiUtil, 'creatingEntityLogMessage')
        .mockReturnValue(faker.lorem.sentence());

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      const entityFolderName = faker.lorem.word();
      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          { name: entityFolderName } as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word()
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalled();
          const [
            _findWithEntityType,
            _findWithWatermarkedType,
            _findWithGroup,
            findWithSlug,
          ] = mockedFindOneEntity$.mock.calls[0];
          expect(findWithSlug).toBe(entityFolderName);
          const [
            _createWithEntityType,
            _createWithWatermarkedType,
            _createWithGroup,
            createWithSlug,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(createWithSlug).toBe(entityFolderName);
          done();
        });
    });

    it('should create an entity with an initial slug when provided', (done: any) => {
      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      jest
        .spyOn(apiUtil, 'creatingEntityLogMessage')
        .mockReturnValue(faker.lorem.sentence());

      const mockedCreateEntityForFolder$ = jest
        .spyOn(entityRepositoryFunctions, 'createEntityForFolder$')
        .mockReturnValue(of({} as DocumentModel));

      const initialSlug = faker.lorem.word();
      entityCreateOneForFolderProvider
        .createOneEntityForFolder$(
          { name: faker.lorem.word() } as GoogleDriveFolder,
          faker.random.arrayElement(Object.values(EntityType)),
          faker.random.arrayElement(Object.values(WatermarkedType)),
          faker.lorem.word(),
          initialSlug
        )
        .subscribe(() => {
          expect(mockedFindOneEntity$).toHaveBeenCalled();
          const [
            _findWithEntityType,
            _findWithWatermarkedType,
            _findWithGroup,
            findWithSlug,
          ] = mockedFindOneEntity$.mock.calls[0];
          expect(findWithSlug).toBe(initialSlug);
          const [
            _createWithEntityType,
            _createWithWatermarkedType,
            _createWithGroup,
            createWithSlug,
          ] = mockedCreateEntityForFolder$.mock.calls[0];
          expect(createWithSlug).toBe(initialSlug);
          done();
        });
    });
  });
});
