import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, switchMap } from 'rxjs';

import { Auth0User } from '@dark-rush-photography/website/types';
import { Auth0AuthService } from './auth0-auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth0AuthService: Auth0AuthService
  ) {}

  loadIsAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadIsAuthenticated),
      switchMap(() =>
        this.auth0AuthService.isAuthenticated$.pipe(
          map((isAuthenticated) =>
            AuthActions.loadIsAuthenticatedSuccess({ isAuthenticated })
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() =>
        this.auth0AuthService.user$.pipe(
          map((user) =>
            AuthActions.loadUserSuccess({ user: user as Auth0User })
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this.auth0AuthService.logout$())
      ),
    { dispatch: false }
  );

  loginWithRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginWithRedirect),
        switchMap(() => this.auth0AuthService.loginWithRedirect$())
      ),
    { dispatch: false }
  );
}
