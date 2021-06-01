import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.scss'],
})
export class AdminDestinationsComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly metaService: MetaService,
    private readonly fb: FormBuilder
  ) {}

  address = this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: [''],
  });

  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.address,
  });

  ngOnInit(): void {
    this.metaService.addMetadataForPage(
      Page.AdminDestinations,
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
