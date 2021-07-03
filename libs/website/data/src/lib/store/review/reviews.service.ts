import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Review } from '@dark-rush-photography/shared/types';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewsService {
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Review[]> {
    return this.http.get<Review[]>('http://localhost:4200/api/reviews');
  }

  get$(id: string): Observable<Review> {
    return this.http.get<Review>(`http://localhost:4200/api/reviews/${id}`);
  }

  add$(review: Review): Observable<Review> {
    return this.http.post<Review>(
      `http://localhost:4200/api/admin/reviews`,
      review
    );
  }

  update$(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(
      `http://localhost:4200/api/admin/reviews/${id}`,
      review
    );
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<string>(
      `http://localhost:4200/api/admin/reviews/${id}`
    );
  }
}
