import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetadataService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './favorite-image.component.html',
  styleUrls: ['./favorite-image.component.scss'],
})
export class FavoriteImageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { title, description, url } = data['metadata'];
      this.metadataService.setMetadata$(
        { title, seoDescription: description },
        url
      );
    });
  }
}
