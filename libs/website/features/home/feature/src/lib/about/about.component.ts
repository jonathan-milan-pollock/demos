import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(
      PageType.About,
      this.route.snapshot.url.join('/')
    );
  }
}
