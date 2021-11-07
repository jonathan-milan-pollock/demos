import { Component, OnInit } from '@angular/core';
import { Page } from '@dark-rush-photography/website/types';

import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    private readonly metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage$(Page.Reviews, '');
  }
}
