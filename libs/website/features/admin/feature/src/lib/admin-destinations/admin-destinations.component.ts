import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '@dark-rush-photography/website/util';

import { PageType } from '@dark-rush-photography/website/types';

@Component({
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDestinationsComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(
      PageType.AdminDestinations,
      this.router.url
    );
  }
  /*
  readonly identifier: Identifier;
  readonly metadata: DocumentMetadata;
  readonly location: Location;
  readonly display: Display;
  readonly content: {
    readonly text: string[];
    readonly images?: ReadonlySet<Image>;
    readonly threeSixtyImages?: ReadonlySet<ThreeSixtyImage>;
    readonly videos?: ReadonlySet<Video>;
  };
  
  */
}
