import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.Destinations, this.router.url);
  }
}
