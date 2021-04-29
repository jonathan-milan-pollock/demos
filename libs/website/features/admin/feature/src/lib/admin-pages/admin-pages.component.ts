import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageType } from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPagesComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.Admin, '');
  }
}
