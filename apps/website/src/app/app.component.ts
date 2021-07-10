import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Auth0User } from '@dark-rush-photography/website/types';
import {
  Auth0AuthService,
  AppState,
  selectAllReviews,
  loadReviews,
} from '@dark-rush-photography/website/data';
import {
  ADMIN,
  Destination,
  Review,
} from '@dark-rush-photography/shared/types';

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

  destinations$: Observable<Destination[]> = EMPTY;
  reviews$: Observable<Review[]> = EMPTY;

  constructor(
    private readonly auth0AuthService: Auth0AuthService,
    private readonly router: Router,
    private readonly store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.reviews$ = this.store$
      .select('review')
      .pipe(map((reviewsState) => selectAllReviews(reviewsState)));
    this.isAuthenticated$ = this.auth0AuthService.isAuthenticated$;
    this.auth0UserSubscription = this.auth0AuthService.user$.subscribe(
      (user) => (this.user = user as Auth0User)
    );
    this.store$.dispatch(loadReviews());
    this.router.events
      .pipe(
        pluck('url'),
        map((url) => url as string)
      )
      .subscribe((url) => {
        this.activeUrl = url;
      });

    this.initForm();
  }

  private initForm() {
    this;
  }

  get isAdmin(): boolean {
    const rolesUrl = 'https://www.darkrushphotography.com/roles';
    if (!this.user || !this.user[rolesUrl]) return false;

    return this.user[rolesUrl].includes(ADMIN);
  }

  onSignIn(): void {
    this.auth0AuthService.loginWithRedirect$();
  }

  onSignOut(): void {
    this.auth0AuthService.logout$();
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
