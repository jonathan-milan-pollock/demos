import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  eventSlug = '';

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data['metadata']);
    });

    this.metaService.addMetadataForPage(PageType.Event, '');
    this.route.params.subscribe((params) => {
      this.eventSlug = params['event'];
    });
  }
}
