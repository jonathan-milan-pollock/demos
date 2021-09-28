/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';
import { last, of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { model } from 'mongoose';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentSchema } from '../schema/document.schema';
import {
  createEntities$,
  getSlugForCreateEntities,
} from './entity-create.functions';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('../entities/entity.functions', () => ({
  ...jest.requireActual('../entities/entity.functions'),
}));
import * as entityFunctions from '../entities/entity.functions';

const mockingoose = require('mockingoose');

describe('entity-create.functions', () => {
  describe('createEntities$', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should create an entity', (done: any) => {
      const folderName = faker.lorem.word();

      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([{ id: '', name: '' }]));

      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([], 'find');
      mockingoose(documentModel).toReturn({ slug: folderName }, 'save');

      const mockLoadNewEntity = jest.spyOn(entityFunctions, 'loadNewEntity');

      createEntities$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word()
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result?.slug).toBe(folderName);
          expect(mockLoadNewEntity).toHaveBeenCalled();
          done();
        });
    });

    it('should return entity if it already exists', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([{ id: '', name: '' }]));

      const slug = faker.lorem.word();
      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([{ slug }], 'find');

      const mockLoadNewEntity = jest.spyOn(entityFunctions, 'loadNewEntity');

      createEntities$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        faker.lorem.word()
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result?.slug).toBe(slug);
          expect(mockLoadNewEntity).not.toHaveBeenCalled();
          done();
        });
    });

    it('should return undefined if google drive folders are not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([]));

      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel);

      createEntities$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word()
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result).toBe(undefined);
          done();
        });
    });
  });

  describe('getSlugForCreateEntities$', () => {
    it('should return slug if provided', () => {
      const slug = faker.lorem.word();
      const result = getSlugForCreateEntities(faker.lorem.word(), slug);
      expect(result).toBe(slug);
    });

    it('should return entity folder name when slug is undefined', () => {
      const entityFolderName = faker.lorem.word();
      const result = getSlugForCreateEntities(entityFolderName, undefined);
      expect(result).toBe(entityFolderName);
    });
  });
});
