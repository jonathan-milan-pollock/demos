import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  slug = 'classic-1952-pontiac';
  seoTitle = 'Classic 1952 Pontiac';
  seoDescription = 'a Classic 1952 Pontiac';

  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { title, description, url } = data['metadata'];
      this.metaService.addMetadata$({ title, description }, url);
    });
  }

  /*
          {
          title: 'Classic 1952 Pontiac',
          description: `Event Photography of ${this.seoDescription} by Dark Rush Photography`,
        },
        `/destinations/${this.slug}`
  */
}
