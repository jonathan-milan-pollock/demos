import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ImagePost } from '@dark-rush-photography/shared/types';

@Injectable()
export class ImagePostService {
  constructor(private readonly http: HttpClient) {}

  create$(imagePost: ImagePost): Observable<boolean> {
    return this.http.post<boolean>(
      `http://localhost:1111/api/v1/admin/image-post`,
      imagePost
    );
  }
}
