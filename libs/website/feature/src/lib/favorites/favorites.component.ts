import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';

import {
  EntityPublic,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { PageType } from '@dark-rush-photography/website/types';
import {
  getImageUrlForWebsite,
  MetadataService,
} from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  isLoading$ = of(true);
  favoritesEntity$?: Observable<EntityPublic | undefined> = of(undefined);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<EntitiesState>,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.isLoading));
    this.favoritesEntity$ = this.route.data.pipe(
      map((data) => data['entity'] as EntityPublic)
    );
    this.metadataService.setMetadataForPageType$(
      PageType.Home,
      this.router.url
    );
  }

  getImages(entity: EntityPublic): string {
    const images = entity.images.map((image) => ({
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
    }));
    return JSON.stringify(images);
  }
}
