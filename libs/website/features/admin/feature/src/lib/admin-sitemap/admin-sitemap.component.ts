import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin-sitemap.component.html',
  styleUrls: ['./admin-sitemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSitemapComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.AdminSitemap, this.router.url);
  }
}
