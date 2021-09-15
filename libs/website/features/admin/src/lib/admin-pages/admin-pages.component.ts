import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faCameraPolaroid } from '@fortawesome/pro-regular-svg-icons';

import { Page } from '@dark-rush-photography/website/types';
import {
  AuthenticationService,
  MetaService,
} from '@dark-rush-photography/website/data';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
})
export class AdminPagesComponent implements OnInit {
  faSitemap = faCameraPolaroid;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private metaService: MetaService
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.authenticationService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.metaService.addMetadataForPage$(Page.Admin, this.router.url);
  }

  onClicked(link: string): void {
    this.router.navigate([link], { relativeTo: this.route });
  }
}
