import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(PageType.Events, '');
  }

  onEventClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
