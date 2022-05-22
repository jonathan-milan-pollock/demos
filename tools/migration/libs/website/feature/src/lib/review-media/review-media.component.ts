import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import {
  ImageDimensionType,
  ImagePublic,
} from '@dark-rush-photography/shared/types';
import { PageType } from '@dark-rush-photography/website/types';
import {
  getImageUrlForWebsite,
  MetadataService,
} from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './review-media.component.html',
  styleUrls: ['./review-media.component.scss'],
})
export class ReviewMediaComponent implements OnInit {
  faEdit = faEdit;

  readonly title = 'REVIEW';
  readonly textWriteReview = `Would you please send your
    review to the websites below.`;
  readonly textThankYou = 'Thank you!';

  isLoading$ = of(true);
  reviewMediaImage$?: Observable<ImagePublic | undefined> = of(undefined);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<EntitiesState>,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.isLoading));
    this.reviewMediaImage$ = this.route.data.pipe(
      map((data) => data['entity'].images[0] as ImagePublic)
    );
    this.metadataService.setMetadataForPageType$(
      PageType.ReviewMedia,
      this.router.url
    );
  }

  getImages(image: ImagePublic): string {
    return JSON.stringify([
      {
        thumbnailSrc: getImageUrlForWebsite(
          image.storageId,
          image.slug,
          ImageDimensionType.Thumbnail,
          false
        ),
        imageSrc: getImageUrlForWebsite(
          image.storageId,
          image.slug,
          ImageDimensionType.Large,
          false
        ),
      },
    ]);
  }
}
