import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CanComponentDeactivate,
  PageType,
} from '@dark-rush-photography/website/types';
import { SeoService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './stories-admin.component.html',
  styleUrls: ['./stories-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoriesAdminComponent implements OnInit, CanComponentDeactivate {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.addMetadataForPage(PageType.StoriesAdmin, "");
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }
}
