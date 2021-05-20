import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { DynamicPageMetadata } from '@dark-rush-photography/website/types';

@Injectable({
  providedIn: 'root',
})
export class MetaDestinationResolver implements Resolve<DynamicPageMetadata> {
  resolve(
    route: ActivatedRouteSnapshot
  ):
    | DynamicPageMetadata
    | Observable<DynamicPageMetadata>
    | Promise<DynamicPageMetadata> {
    console.log('route', route);

    /*
    return (
      {
        title: this.seoTitle,
        description: ``,
      },
      `/destinations/${this.slug}`
    );
    */

    return {
      title: 'title',
      description: 'description',
      url: '',
    };
  }
}
