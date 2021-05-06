import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PageType } from '@dark-rush-photography/website/types';

import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.Reviews, '');
  }
}