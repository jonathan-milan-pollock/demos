import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.Stories, "");
  }

  onStoryClicked(): void {
    this.router.navigate(['1'], { relativeTo: this.route });
  }
}
