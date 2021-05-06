import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEventsComponent implements OnInit {
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.AdminEvents, this.router.url);
  }
}
