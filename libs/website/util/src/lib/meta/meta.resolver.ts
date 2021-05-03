import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Metadata } from '@dark-rush-photography/shared-types';

@Injectable({
  providedIn: 'root',
})
export class MetaResolver implements Resolve<Metadata> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Metadata | Observable<Metadata> | Promise<Metadata> {
    console.log('route url', route.url);
    console.log('state url', state.url);

    return {
      title: 'title',
      description: 'description',
    };
  }
}
