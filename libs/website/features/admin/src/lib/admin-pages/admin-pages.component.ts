import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faHome, faEdit, faCog } from '@fortawesome/free-solid-svg-icons';
import { faCameraAlt, faFilmAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCameraPolaroid } from '@fortawesome/pro-regular-svg-icons';
import { faBookOpen, faCaravan } from '@fortawesome/pro-regular-svg-icons';

import { Page } from '@dark-rush-photography/website/types';
import {
  Auth0AuthService,
  MetaService,
} from '@dark-rush-photography/website/data';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPagesComponent implements OnInit {
  faHome = faHome;
  faEdit = faEdit;
  faCameraAlt = faCameraAlt;
  faCalendar = faCalendar;
  faBookOpen = faBookOpen;
  faCaravan = faCaravan;
  faFilmAlt = faFilmAlt;
  faCameraPolaroid = faCameraPolaroid;
  faCog = faCog;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly auth0AuthService: Auth0AuthService,
    private metaService: MetaService
  ) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.auth0AuthService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.Admin, this.router.url);
  }

  onClicked(link: string): void {
    console.log(link);
    this.router.navigate([link], { relativeTo: this.route });
  }
}
