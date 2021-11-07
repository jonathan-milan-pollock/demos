import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY, map, Observable, pluck, Subscription } from 'rxjs';

import { ADMIN, Auth0User } from '@dark-rush-photography/website/types';
import { loginWithRedirect, logout } from '@dark-rush-photography/website/data';
import { Entity } from '@dark-rush-photography/shared/types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'drp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private auth0UserSubscription?: Subscription;

  activeUrl = '';
  isAuthenticated$: Observable<boolean> = EMPTY;
  user?: Auth0User;

  destinations$: Observable<Entity[]> = EMPTY;
  reviews$: Observable<Entity[]> = EMPTY;

  constructor(
    private readonly router: Router,
    private readonly store: Store<{ isAuthenticated: boolean; user: Auth0User }>
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select((state) => state.isAuthenticated);
    this.user = this.store.select((state) => state.user);

    this.router.events
      .pipe(
        pluck('url'),
        map((url) => url as string)
      )
      .subscribe((url) => {
        this.activeUrl = url;
      });
  }

  get isAdmin(): boolean {
    const rolesUrl = 'https://www.darkrushphotography.com/roles'; //TODO: Move to constant
    if (!this.user || !this.user[rolesUrl]) return false;

    return this.user[rolesUrl].includes(ADMIN);
  }

  onSignIn(): void {
    this.store.dispatch(loginWithRedirect());
  }

  onSignOut(): void {
    this.store.dispatch(logout());
  }

  onTabClicked(activeUrl: string): void {
    this.router.navigate([activeUrl]);
  }

  onLinkClicked(link: string): void {
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    this.auth0UserSubscription?.unsubscribe();
  }
}
