import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';

import { EntityPublic } from '@dark-rush-photography/shared/types';
import { PageType } from '@dark-rush-photography/website/types';
import { MetadataService } from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  readonly title = 'ABOUT';
  readonly subTitleContactUs = 'CONTACT US';
  readonly textPhoneNumber = '404.992.3275';
  readonly textEmail = 'dark@darkrush.photo';
  readonly textOpenHours = 'Open Monday through Sunday 24 hours';
  readonly subTitleLocations = 'PHOTOGRAPHY LOCATIONS';
  readonly textLocations = `Dark Rush Photography is located in Sandy Springs, Georgia. We often
     work with clients in the following locations and would be happy to
     discuss shooting outside these areas.`;
  readonly locations = [
    'Buckhead, Georgia',
    'Midtown, Georgia',
    'Sandy Springs, Georgia',
    'Dunwoody, Georgia',
    'Vinings, Georgia',
    'Atlanta, Georgia',
    'Helen, Georgia',
    'Chattanooga, Tennessee',
  ];
  readonly subTitleFindUsOn = 'FIND US ON';

  isLoading$ = of(true);
  aboutEntities$ = of([] as EntityPublic[]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<EntitiesState>,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.isLoading));
    this.aboutEntities$ = this.route.data.pipe(
      map((data) => data['entities'] as EntityPublic[])
    );
    this.metadataService.setMetadataForPageType$(
      PageType.About,
      this.router.url
    );
  }
}
