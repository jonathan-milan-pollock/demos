import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';

import { EntityFindOnePublicResponse } from '@dark-rush-photography/shared/types';
import { MetadataService } from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  isLoading$ = of(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<EntitiesState>,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.isLoading));
    this.route.data.subscribe((data) => {
      const entityFindOnePublicResponse = data[
        'entity'
      ] as EntityFindOnePublicResponse;
      const entity = entityFindOnePublicResponse.publicEntity;
      this.metadataService.setMetadata$(
        { title: entity.title, seoDescription: entity.seoDescription },
        this.router.url
      );
    });
  }
}
