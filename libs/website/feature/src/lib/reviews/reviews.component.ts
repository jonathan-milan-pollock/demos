import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { EntityPublic } from '@dark-rush-photography/shared/types';
import { PageType } from '@dark-rush-photography/website/types';
import { MetadataService } from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  faEdit = faEdit;

  readonly title = 'REVIEWS';
  readonly textAbout = `Over the years, I've been fortunate
    to work with many wonderful clients and I genuinely appreciate each
    opportunity.`;
  readonly subTitleClients = 'CLIENTS';
  readonly textClients = 'Clients we work for include:';
  readonly clients = [
    'Atlanta Jewish Times',
    'Buckhead Business Association (BBA)',
    'Brook Furniture Rental',
    'City Springs',
    'Heritage Sandy Springs',
    'Midtown Alliance',
    'Proud Smiles Dental',
    'Reporter Newspapers',
    'Restaurant Informer',
    'Sandy Springs Perimeter Chamber',
    'Taste of Atlanta',
  ];

  isLoading$ = of(true);
  reviewEntities$ = of([] as EntityPublic[]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<EntitiesState>,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.isLoading));
    this.reviewEntities$ = this.route.data.pipe(
      map((data) => data['entities'] as EntityPublic[])
    );
    this.metadataService.setMetadataForPageType$(
      PageType.Reviews,
      this.router.url
    );
  }

  onLinkClicked() {
    this.router.navigateByUrl('/reviews/review');
  }
}
