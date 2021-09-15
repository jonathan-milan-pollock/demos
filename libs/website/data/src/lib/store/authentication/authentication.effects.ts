import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs';

import { Auth0User } from '@dark-rush-photography/website/types';
import {
  isAuthenticatedResponse,
  loadIsAuthenticated,
  loadUser,
  loadUserSuccess,
  loginWithRedirect,
  logout,
} from '@dark-rush-photography/website/data';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}

  loadIsAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIsAuthenticated),
      switchMap(() =>
        this.authenticationService.isAuthenticated$.pipe(
          map((isAuthenticated) => isAuthenticatedResponse({ isAuthenticated }))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.authenticationService.user$.pipe(
          map((user) => loadUserSuccess({ user: user as Auth0User }))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        switchMap(() => this.authenticationService.logout$())
      ),
    { dispatch: false }
  );

  loginWithRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginWithRedirect),
        tap(() => console.log('calling login with redirect')),
        switchMap(() => this.authenticationService.loginWithRedirect$())
      ),
    { dispatch: false }
  );
}
