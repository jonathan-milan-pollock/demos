import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';

export const photoOfTheWeekAdapter: EntityAdapter<PhotoOfTheWeek> = createEntityAdapter<PhotoOfTheWeek>(
  {
    selectId: (photoOfTheWeek: PhotoOfTheWeek): string =>
      photoOfTheWeek.id ?? '',
    //TODO: Add Sort comparer
    // sortComparer: (
    //   photoOfTheWeek1: PhotoOfTheWeek,
    //   photoOfTheWeek2: PhotoOfTheWeek
    // ): number => photoOfTheWeek1.image!.title!.localeCompare(photoOfTheWeek2.title),
  }
);

export interface PhotoOfTheWeekState extends EntityState<PhotoOfTheWeek> {
  selectedPhotoOfTheWeekImageId?: string;
  isLoading: boolean;
  error?: string;
}
