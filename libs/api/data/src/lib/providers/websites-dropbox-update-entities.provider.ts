import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { AboutProvider } from './about.provider';

@Injectable()
export class WebsitesDropboxUpdateEntitiesProvider {
  constructor(
    private readonly aboutProvider: AboutProvider) {}

  update$ (
    ownerRefreshToken: string
  ): Observable<unknown> {
    return this.aboutProvider.update$(
      ownerRefreshToken
    );
  }
}



