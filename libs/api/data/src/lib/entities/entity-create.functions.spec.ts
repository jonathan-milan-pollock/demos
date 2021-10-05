/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException } from '@nestjs/common';

import * as faker from 'faker';
import { of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  Entity,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  createEntityForFolder$,
  createEntity$,
} from './entity-create.functions';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('./entity-repository.functions', () => ({
  ...jest.requireActual('./entity-repository.functions'),
}));
import * as entityRepositoryFunctions from './entity-repository.functions';

jest.mock('./entity-load-document-model.functions', () => ({
  ...jest.requireActual('./entity-load-document-model.functions'),
}));
import * as entityLoadDocumentModelFunctions from './entity-load-document-model.functions';

jest.mock('./entity-validation.functions', () => ({
  ...jest.requireActual('./entity-validation.functions'),
}));
import * as entityValidationFunctions from './entity-validation.functions';

describe('entity-create.functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEntity$', () => {
    it('should create an entity if it does not exist', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityNotAlreadyExists')
        .mockReturnValue(undefined);

      jest
        .spyOn(entityLoadDocumentModelFunctions, 'loadNewEntity')
        .mockReturnValue({} as Entity);

      const mockedCreateNewEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'createNewEntity$')
        .mockReturnValue(of({} as DocumentModel));

      createEntity$(
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        faker.lorem.word(),
        {} as Model<DocumentModel>
      ).subscribe(() => {
        expect(mockedCreateNewEntity$).toHaveBeenCalled();
        done();
      });
    });

    it('should not create an entity if it already exists', (done: any) => {
      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityValidationFunctions, 'validateEntityNotAlreadyExists')
        .mockImplementation(() => {
          throw new ConflictException();
        });

      jest
        .spyOn(entityLoadDocumentModelFunctions, 'loadNewEntity')
        .mockReturnValue({} as Entity);

      const mockedCreateNewEntity$ = jest.spyOn(
        entityRepositoryFunctions,
        'createNewEntity$'
      );

      createEntity$(
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        faker.lorem.word(),
        {} as Model<DocumentModel>
      ).subscribe({
        next: () => {
          done();
        },
        error: () => {
          expect(mockedCreateNewEntity$).not.toHaveBeenCalled();
          done();
        },
        complete: () => {
          done();
        },
      });
    });
  });

  describe('createEntities$', () => {
    it('should create an entity', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([{ id: '', name: '' }]));

      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      jest
        .spyOn(entityLoadDocumentModelFunctions, 'loadNewEntity')
        .mockReturnValue({} as Entity);

      const mockedCreateNewEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'createNewEntity$')
        .mockReturnValue(of({} as DocumentModel));

      createEntityForFolder$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        {} as Model<DocumentModel>,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        faker.lorem.word()
      ).subscribe(() => {
        expect(mockedCreateNewEntity$).toHaveBeenCalled();
        done();
      });
    });

    it('should return entity when it already exists', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([{ id: '', name: '' }]));

      jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const mockedCreateNewEntity$ = jest.spyOn(
        entityRepositoryFunctions,
        'createNewEntity$'
      );

      createEntityForFolder$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        {} as Model<DocumentModel>,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        faker.lorem.word()
      ).subscribe(() => {
        expect(mockedCreateNewEntity$).not.toHaveBeenCalled();
        done();
      });
    });

    it('should create an entity with slug when provided', (done: any) => {
      const entityFolderId = faker.datatype.uuid();
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(
          of([{ id: entityFolderId, name: faker.lorem.word() }])
        );

      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLoadNewEntity = jest
        .spyOn(entityLoadDocumentModelFunctions, 'loadNewEntity')
        .mockReturnValue({} as Entity);

      jest
        .spyOn(entityRepositoryFunctions, 'createNewEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const watermarkedType = faker.random.arrayElement(
        Object.values(WatermarkedType)
      );
      const group = faker.lorem.word();
      const slug = faker.lorem.word();

      createEntityForFolder$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        {} as Model<DocumentModel>,
        entityType,
        watermarkedType,
        group,
        slug
      ).subscribe(() => {
        expect(mockedFindOneEntity$.mock.calls).toEqual([
          [
            entityType,
            watermarkedType,
            group,
            slug,
            {} as Model<DocumentModel>,
          ],
        ]);
        expect(mockedLoadNewEntity.mock.calls).toEqual([
          [entityType, watermarkedType, group, slug, entityFolderId],
        ]);
        done();
      });
    });

    it('should create an entity with folder name when slug is not provided', (done: any) => {
      const entityFolderId = faker.datatype.uuid();
      const entityFolderName = faker.lorem.word();
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockReturnValue(of([{ id: entityFolderId, name: entityFolderName }]));

      const mockedFindOneEntity$ = jest
        .spyOn(entityRepositoryFunctions, 'findOneEntity$')
        .mockReturnValue(of(null));

      const mockedLoadNewEntity = jest
        .spyOn(entityLoadDocumentModelFunctions, 'loadNewEntity')
        .mockReturnValue({} as Entity);

      jest
        .spyOn(entityRepositoryFunctions, 'createNewEntity$')
        .mockReturnValue(of({} as DocumentModel));

      const entityType = faker.random.arrayElement(Object.values(EntityType));
      const watermarkedType = faker.random.arrayElement(
        Object.values(WatermarkedType)
      );
      const group = faker.lorem.word();

      createEntityForFolder$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        {} as Model<DocumentModel>,
        entityType,
        watermarkedType,
        group
      ).subscribe(() => {
        expect(mockedFindOneEntity$.mock.calls).toEqual([
          [
            entityType,
            watermarkedType,
            group,
            entityFolderName,
            {} as Model<DocumentModel>,
          ],
        ]);
        expect(mockedLoadNewEntity.mock.calls).toEqual([
          [
            entityType,
            watermarkedType,
            group,
            entityFolderName,
            entityFolderId,
          ],
        ]);
        done();
      });
    });

    it('should return undefined when google drive folders are not found', (done: any) => {
      jest.spyOn(apiUtil, 'findGoogleDriveFolders$').mockReturnValue(of([]));

      createEntityForFolder$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        {} as Model<DocumentModel>,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word()
      ).subscribe((result) => {
        expect(result).toBe(undefined);
        done();
      });
    });
  });
});
