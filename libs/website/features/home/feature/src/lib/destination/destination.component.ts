import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationComponent implements OnInit {
  slug = '';

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadata(
      {
        title: 'destination title',
        description: 'destination description',
      },
      ''
    );
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });
  }
}
