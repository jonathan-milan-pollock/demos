import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetaService } from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './photo-of-the-week-image.component.html',
  styleUrls: ['./photo-of-the-week-image.component.scss'],
})
export class PhotoOfTheWeekImageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { title, description, url } = data['metadata'];
      this.metaService.addMetadata({ title, description }, url);
    });
  }
}
