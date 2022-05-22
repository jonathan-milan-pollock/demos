import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { PageType } from '@dark-rush-photography/website/types';
import { MetadataService } from '@dark-rush-photography/website/util';
import { EntitiesState } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly metadataService: MetadataService,
    private readonly store: Store<EntitiesState>
  ) {}

  ngOnInit(): void {
    this.metadataService.setMetadataForPageType$(
      PageType.Destinations,
      this.router.url
    );
  }
}
