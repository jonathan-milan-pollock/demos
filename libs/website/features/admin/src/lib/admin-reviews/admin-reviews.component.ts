import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Review } from '@dark-rush-photography/shared/types';
import { Page } from '@dark-rush-photography/website/types';
import { addReview, MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss'],
})
export class AdminReviewsComponent implements OnInit, OnDestroy {
  reviews?: Review[] = [];
  reviewsSub?: Subscription;

  isLoading = true;

  constructor(
    private router: Router,
    private metaService: MetaService,
    private reviewStore: Store<{ review: { reviews: Review[] } }>
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage$(Page.AdminReviews, this.router.url);

    this.reviewsSub = this.reviewStore
      .select('review')
      .subscribe(({ reviews }) => {
        this.isLoading = false;
        this.reviews = reviews;
      });
  }

  ngOnDestroy(): void {
    this.reviewsSub?.unsubscribe();
  }

  onReviewSubmitted(review: Review): void {
    this.isLoading = true;
    this.reviewStore.dispatch(addReview({ review }));
  }
}
