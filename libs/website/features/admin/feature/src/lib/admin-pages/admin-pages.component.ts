import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faHome, faEdit, faCog } from '@fortawesome/free-solid-svg-icons';
import { faCameraAlt, faFilmAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCameraPolaroid } from '@fortawesome/pro-regular-svg-icons';
import { faBookOpen, faCaravan } from '@fortawesome/pro-regular-svg-icons';

@Component({
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPagesComponent {
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
    private readonly router: Router
  ) {}

  onClicked(link: string): void {
    console.log(link);
    this.router.navigate([link], { relativeTo: this.route });
  }
}
