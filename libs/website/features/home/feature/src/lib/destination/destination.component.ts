import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationComponent implements OnInit {
  slug = '';

  constructor(private route: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadata({
      title: 'destination title',
      description: 'destination description',
      url: '',
    });
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
    });
  }
}
