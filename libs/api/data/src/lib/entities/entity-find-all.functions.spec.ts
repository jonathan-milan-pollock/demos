/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as faker from 'faker';
import { last } from 'rxjs';
import { model } from 'mongoose';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  Document,
  DocumentModel,
  DocumentSchema,
} from '../schema/document.schema';
import {
  findAllEntities$,
  findAllEntitiesForGroup$,
} from './entity-find-all.functions';

jest.mock('./entity-load.functions', () => ({
  ...jest.requireActual('./entity-load.functions'),
}));
import * as entityLoadFunctions from './entity-load.functions';

const mockingoose = require('mockingoose');

describe('entity-find-all-entities.functions', () => {
  describe('findAll$', () => {
    it('should should find all entities', (done: any) => {
      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([{} as DocumentModel], 'find');

      const mockLoadDocumentModelsArray = jest
        .spyOn(entityLoadFunctions, 'loadDocumentModelsArray')
        .mockImplementation(() => [{} as DocumentModel]);

      findAllEntities$(
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        documentModel
      )
        .pipe(last())
        .subscribe(() => {
          expect(mockLoadDocumentModelsArray).toHaveBeenCalled();
          done();
        });
    });
  });

  describe('findAllForGroup$', () => {
    it('should should find all entities for a group', (done: any) => {
      const documentModel = model(Document.name, DocumentSchema);
      mockingoose(documentModel).toReturn([{} as DocumentModel], 'find');

      const mockLoadDocumentModelsArray = jest
        .spyOn(entityLoadFunctions, 'loadDocumentModelsArray')
        .mockImplementation(() => [{} as DocumentModel]);

      findAllEntitiesForGroup$(
        faker.random.arrayElement(Object.values(EntityType)),
        faker.random.arrayElement(Object.values(WatermarkedType)),
        faker.lorem.word(),
        documentModel
      )
        .pipe(last())
        .subscribe(() => {
          expect(mockLoadDocumentModelsArray).toHaveBeenCalled();
          done();
        });
    });
  });
});
