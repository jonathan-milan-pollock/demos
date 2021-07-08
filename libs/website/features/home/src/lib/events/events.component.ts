import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage$(Page.Events, this.router.url);
  }

  onEventClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
