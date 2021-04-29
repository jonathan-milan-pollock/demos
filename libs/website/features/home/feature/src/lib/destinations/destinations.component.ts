import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { PageType } from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.Destinations, '');
  }
}
