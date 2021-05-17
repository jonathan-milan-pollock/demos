import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';

import { Page } from '@dark-rush-photography/website/types';
import { MetaService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  private authServiceSub?: Subscription;

  isAuthenticated = false;

  constructor(
    private router: Router,
    private metaService: MetaService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.Admin, this.router.url);
  }

  onSignOut(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authServiceSub?.unsubscribe();
  }
}
