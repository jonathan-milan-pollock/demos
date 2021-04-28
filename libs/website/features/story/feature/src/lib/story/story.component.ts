import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageType } from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent implements OnInit {
  storySlug = '';

  constructor(private route: ActivatedRoute, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.Story, '');
    this.route.params.subscribe((params) => {
      this.storySlug = params['story'];
    });
  }
}
