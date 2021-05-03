import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.Destinations, '');
  }
}
