import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Event } from '@dark-rush-photography/shared/types';

export const eventAdapter: EntityAdapter<Event> = createEntityAdapter<Event>({
  selectId: (event: Event): string => event.id ?? '',
  sortComparer: (event1: Event, event2: Event): number =>
    event1.slug.localeCompare(event2.slug),
});

export interface EventState extends EntityState<Event> {
  selectedEventId?: string;
  isLoading: boolean;
  error?: string;
}
