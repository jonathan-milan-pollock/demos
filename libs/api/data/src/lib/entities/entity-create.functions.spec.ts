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
import { createEntity$ } from './entity-create.functions';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

const mockingoose = require('mockingoose');

describe('entity-create.functions', () => {
  describe('createEntity$', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('should create an entity', (done: any) => {
      const entityFolderName = faker.lorem.word();

      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([{ id: '', name: entityFolderName }]));

      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([], 'find');
      mockingoose(documentModel).toReturn({ slug: entityFolderName }, 'save');

      createEntity$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word()
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result?.slug).toBe(entityFolderName);
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

      createEntity$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word()
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result?.slug).toBe(slug);
          done();
        });
    });

    it('should create entity with slug if provided', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([{ id: '', name: faker.lorem.word() }]));

      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([], 'find');

      const slug = faker.lorem.word();
      mockingoose(documentModel).toReturn({ slug }, 'save');

      createEntity$(
        {} as drive_v3.Drive,
        faker.datatype.uuid(),
        documentModel,
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        slug
      )
        .pipe(last())
        .subscribe((result) => {
          expect(result?.slug).toBe(slug);
          done();
        });
    });

    it('should return undefined if google drive folders are not found', (done: any) => {
      jest
        .spyOn(apiUtil, 'findGoogleDriveFolders$')
        .mockImplementation(() => of([]));

      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel);

      createEntity$(
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
});
