/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  EntityMinimalPublic,
  EntityPublic,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { EntityFindPublicProvider } from '../providers/entity-find-public.provider';
import { PublicEntitiesService } from './public-entities.service';

describe('public-entities.service', () => {
  let publicEntitiesService: PublicEntitiesService;
  let entityFindPublicProvider: EntityFindPublicProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useValue: new MockDocumentModel(),
        },
        PublicEntitiesService,
        EntityFindPublicProvider,
      ],
    }).compile();

    publicEntitiesService = moduleRef.get<PublicEntitiesService>(
      PublicEntitiesService
    );
    entityFindPublicProvider = moduleRef.get<EntityFindPublicProvider>(
      EntityFindPublicProvider
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllPublic$', () => {
    it('should find all public entities', (done: any) => {
      const mockedFindAllPublicEntities$ = jest
        .spyOn(entityFindPublicProvider, 'findAllPublicEntities$')
        .mockReturnValue(of([] as EntityMinimalPublic[]));

      publicEntitiesService
        .findAllPublic$(faker.random.arrayElement(Object.values(EntityType)))
        .subscribe(() => {
          expect(mockedFindAllPublicEntities$).toBeCalled();
          done();
        });
    });
  });

  describe('findOnePublic$', () => {
    it('should find one public entity', (done: any) => {
      const mockedFindOnePublicEntity$ = jest
        .spyOn(entityFindPublicProvider, 'findOnePublicEntity$')
        .mockReturnValue(of({} as EntityPublic));

      publicEntitiesService
        .findOnePublic$(
          faker.random.arrayElement(Object.values(EntityType)),
          DUMMY_MONGODB_ID
        )
        .subscribe(() => {
          expect(mockedFindOnePublicEntity$).toBeCalled();
          done();
        });
    });
  });
});
