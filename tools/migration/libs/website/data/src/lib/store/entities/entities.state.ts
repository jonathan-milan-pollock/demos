import {
  EntityFindAllPublicResponse,
  EntityFindOnePublicResponse,
} from '@dark-rush-photography/shared/types';

export interface EntitiesState {
  isLoading: boolean;
  error?: string;
  entityFindAllPublicResponses: EntityFindAllPublicResponse[];
  entityFindOnePublicResponses: EntityFindOnePublicResponse[];
}
