import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PhotoOfTheWeek, Review } from '@dark-rush-photography/shared-types';
import { addReview } from '@dark-rush-photography/website/data';

@Component({
  selector: 'drp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  reviews?: Observable<{ reviews: Review[] }> = undefined;
  photoOfTheWeek?: Observable<{ photoOfTheWeek: PhotoOfTheWeek[] }> = undefined;

  constructor(
    private reviewStore: Store<{ review: { reviews: Review[] } }>,
    private photoOfTheWeekStore: Store<{
      photoOfTheWeek: { photoOfTheWeek: PhotoOfTheWeek[] };
    }>
  ) {}

  ngOnInit(): void {
    this.reviews = this.reviewStore.select('review');
    this.photoOfTheWeek = this.photoOfTheWeekStore.select('photoOfTheWeek');
  }

  onClicked(): void {
    // add a review
    this.reviewStore.dispatch(
      addReview({
        review: {
          identifier: {
            slug: 'new-review',
          },
          meta: {
            title: 'New Review',
            description: 'Very awesome company with a girl I love!!!',
          },
          content: {},
        },
      })
    );
  }
}
