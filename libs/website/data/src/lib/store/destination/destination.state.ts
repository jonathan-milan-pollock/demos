import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Destination } from '@dark-rush-photography/shared-types';

export const destinationAdapter: EntityAdapter<Destination> = createEntityAdapter<Destination>(
  {
    selectId: (destination: Destination): string => destination.id ?? '',
    sortComparer: (
      destination1: Destination,
      destination2: Destination
    ): number => destination1.title.localeCompare(destination2.title),
  }
);

export interface DestinationState extends EntityState<Destination> {
  selectedDestinationId?: string;
  isLoading: boolean;
  error?: string;
}
