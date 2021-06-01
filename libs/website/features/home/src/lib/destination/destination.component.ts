import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metadata } from '@dark-rush-photography/website/types';

import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  slug = '';
  seoTitle = 'Colorado';
  seoDescription = 'in Colorado';

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.metaService.addMetadata({} as Metadata, '');
    });

    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });
  }
}
