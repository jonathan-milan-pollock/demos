import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { MetadataService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  data = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = JSON.stringify(data);
    });

    this.metadataService.setMetadataForPageType$(
      PageType.Events,
      this.router.url
    );
  }

  onEventClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
