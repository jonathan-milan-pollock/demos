import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Page } from '@dark-rush-photography/website/types';
import { AuthService, MetaService } from '@dark-rush-photography/website/util';

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
    private authService: AuthService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.metaService.addMetadataForPage(Page.Admin, this.router.url);

    this.authServiceSub = this.authService.authenticationChanged.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  onAuthenticate(): void {
    if (this.isAuthenticated) {
      this.authService.signOut();
    } else {
      this.authService.signIn();
    }
  }

  ngOnDestroy(): void {
    this.authServiceSub?.unsubscribe();
  }
}
