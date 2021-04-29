import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CanComponentDeactivate,
  PageType,
} from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './reviews-admin.component.html',
  styleUrls: ['./reviews-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsAdminComponent implements OnInit, CanComponentDeactivate {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.ReviewsAdmin, '');
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
