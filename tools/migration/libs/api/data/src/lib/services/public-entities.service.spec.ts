/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { Document } from '../schema/document.schema';
import { ConfigProvider } from '../providers/config.provider';
import { EntityFindPublicProvider } from '../providers/entity-find-public.provider';
import { PublicEntitiesService } from './public-entities.service';

describe('public-entities.service', () => {
  let publicEntitiesService: PublicEntitiesService;
  let entityFindPublicProvider: EntityFindPublicProvider;

  beforeEach(async () => {
    class MockConfigProvider {}
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: ConfigProvider,
          useClass: MockConfigProvider,
        },
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
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
        .mockReturnValue(of({} as EntityFindAllPublicResponse));

      publicEntitiesService
        .findAllPublic$(faker.random.arrayElement(Object.values(EntityType)))
        .subscribe(() => {
          expect(mockedFindAllPublicEntities$).toBeCalledTimes(1);
          done();
        });
    });
  });

  describe('findOnePublic$', () => {
    it('should find one public entity', (done: any) => {
      const mockedFindOnePublicEntity$ = jest
        .spyOn(entityFindPublicProvider, 'findOnePublicEntity$')
        .mockReturnValue(of({} as EntityFindOnePublicResponse));

      publicEntitiesService.findOnePublic$(DUMMY_MONGODB_ID).subscribe(() => {
        expect(mockedFindOnePublicEntity$).toBeCalledTimes(1);
        done();
      });
    });
  });
});
