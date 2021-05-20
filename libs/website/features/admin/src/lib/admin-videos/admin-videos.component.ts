import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminVideosComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.AdminVideos, this.router.url);
  }
}
