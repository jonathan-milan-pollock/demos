import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { map, Observable, take } from 'rxjs';

import { Metadata } from '@dark-rush-photography/website/types';
import { Store } from '@ngrx/store';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';

@Injectable({
  providedIn: 'root',
})
export class MetaPhotoOfTheWeekImageResolver implements Resolve<Metadata> {
  constructor(
    private photoOfTheWeekStore: Store<{
      photoOfTheWeek: { photoOfTheWeek: PhotoOfTheWeek[] };
    }>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Metadata> {
    return this.photoOfTheWeekStore.select('photoOfTheWeek').pipe(
      take(1),
      map(
        (photoOfTheWeek) =>
          ({
            //title: photoOfTheWeek.photoOfTheWeek[0].images?.title,
            //description: photoOfTheWeek.photoOfTheWeek[0].image?.description,
            //url: route.url.toString(),
          } as Metadata)
      )
    );
  }
}
