import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EntityAdmin } from '@dark-rush-photography/shared/types';

@Injectable()
export class ImagePostService {
  constructor(private readonly http: HttpClient) {}

  create$(imagePost: EntityAdmin): Observable<boolean> {
    return this.http.post<boolean>(
      `http://localhost:1111/api/v1/admin/image-post`,
      imagePost
    );
  }
}
