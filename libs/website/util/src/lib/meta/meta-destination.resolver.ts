import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Metadata } from '@dark-rush-photography/website/types';

@Injectable({
  providedIn: 'root',
})
export class MetaDestinationResolver implements Resolve<Metadata> {
  resolve(
    route: ActivatedRouteSnapshot
  ): Metadata | Observable<Metadata> | Promise<Metadata> {
    console.log('route', route);

    /*
    return (
      {
        title: this.seoTitle,
        description: `An Extended Reality (XR) experience ${this.seoDescription} presented by Dark Rush Photography`,
      },
      `/destinations/${this.slug}`
    );
    */

    return {
      title: 'title',
      description: 'description',
    };
  }
}
