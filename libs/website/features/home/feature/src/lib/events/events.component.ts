import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.Events, this.router.url);
  }

  onEventClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
