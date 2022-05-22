/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import faker from '@faker-js/faker';
import { of } from 'rxjs';

import { EntityOrders } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';

import { EntityOrderProvider } from './entity-order.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

describe('entity-order.provider', () => {
  let entityOrderProvider: EntityOrderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        EntityOrderProvider,
      ],
    }).compile();

    entityOrderProvider =
      moduleRef.get<EntityOrderProvider>(EntityOrderProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('order$', () => {
    it('should order entities', (done: any) => {
      const mockedFindEntityByIdAndUpdateOrder$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityByIdAndUpdateOrder$')
        .mockReturnValue(of({} as DocumentModel));

      const entity1Id = faker.datatype.uuid();
      const entity1Order = faker.datatype.number();
      const entity2Id = faker.datatype.uuid();
      const entity2Order = faker.datatype.number();

      entityOrderProvider
        .order$({
          entityIdOrders: [
            { entityId: entity1Id, order: entity1Order },
            { entityId: entity2Id, order: entity2Order },
          ],
        } as EntityOrders)
        .subscribe(() => {
          expect(mockedFindEntityByIdAndUpdateOrder$).toBeCalledTimes(2);
          const [entityFirstId, entityFirstOrder] =
            mockedFindEntityByIdAndUpdateOrder$.mock.calls[0];
          expect(entityFirstId).toBe(entity1Id);
          expect(entityFirstOrder).toBe(entity1Order);
          const [entitySecondId, entitySecondOrder] =
            mockedFindEntityByIdAndUpdateOrder$.mock.calls[1];
          expect(entitySecondId).toBe(entity2Id);
          expect(entitySecondOrder).toBe(entity2Order);
          done();
        });
    });

    it('should not order entities if there are not any entities to order', (done: any) => {
      const mockedFindEntityByIdAndUpdateOrder$ = jest.spyOn(
        entityRepositoryFunctions,
        'findEntityByIdAndUpdateOrder$'
      );

      entityOrderProvider
        .order$({
          entityIdOrders: [],
        } as EntityOrders)
        .subscribe(() => {
          expect(mockedFindEntityByIdAndUpdateOrder$).not.toBeCalled();
          done();
        });
    });
  });
});
