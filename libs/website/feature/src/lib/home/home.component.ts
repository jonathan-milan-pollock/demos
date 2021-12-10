import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY, Observable } from 'rxjs';

import { Entity } from '@dark-rush-photography/shared/types';
import { PageType } from '@dark-rush-photography/website/types';
import { MetadataService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  activeUrl = '';
  destinations$: Observable<Entity[]> = EMPTY;
  reviews$: Observable<Entity[]> = EMPTY;

  constructor(
    private readonly router: Router,
    private readonly metadataService: MetadataService
  ) {}

  ngOnInit(): void {
    this.metadataService.setMetadataForPageType$(
      PageType.Home,
      this.router.url
    );
  }

  onTabClicked(activeUrl: string): void {
    this.router.navigate([activeUrl]);
  }

  onLinkClicked(link: string): void {
    this.router.navigate([link]);
  }
}
