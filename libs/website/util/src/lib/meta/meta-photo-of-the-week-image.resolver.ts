import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Metadata } from '@dark-rush-photography/website/types';

@Injectable({
  providedIn: 'root',
})
export class MetaPhotoOfTheWeekImageResolver implements Resolve<Metadata> {
  resolve(
    route: ActivatedRouteSnapshot
  ): Metadata | Observable<Metadata> | Promise<Metadata> {
    console.log('route', route);

    return {
      title: 'title',
      description: 'description',
    };
  }
}
