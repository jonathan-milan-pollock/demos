import {
  EntityMinimalPublic,
  EntityPublic,
} from '@dark-rush-photography/shared/types';

export interface PublicEntityState {
  publicEntities: EntityMinimalPublic[];
  publicEntity?: EntityPublic;
  isLoading: boolean;
  error?: string;
}
