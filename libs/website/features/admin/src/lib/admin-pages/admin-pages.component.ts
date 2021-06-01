import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faEdit, faCog } from '@fortawesome/free-solid-svg-icons';
import {
  faCameraAlt,
  faFilmAlt,
  faHouseNight,
  faChild,
} from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faMountains } from '@fortawesome/pro-duotone-svg-icons';
import { faCameraPolaroid, faLeaf } from '@fortawesome/pro-regular-svg-icons';
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
})
export class AdminPagesComponent implements OnInit {
  faFavorites = faCameraAlt;
  faReviews = faEdit;
  faPhotoOfTheWeek = faCalendar;
  faEvents = faBookOpen;
  faDestinations = faCaravan;
  faBestOfEvents = faBookOpen;
  faBestOfRealEstate = faHouseNight;
  faBestOfNature = faLeaf;
  faBestOfLandscapes = faMountains;
  faBestOfChildren = faChild;
  faVideos = faFilmAlt;
  faSitemap = faCameraPolaroid;
  faSettings = faCog;

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
    this.router.navigate([link], { relativeTo: this.route });
  }
}
