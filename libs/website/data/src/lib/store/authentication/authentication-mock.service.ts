import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0User } from '@dark-rush-photography/website/types';

import { EMPTY, Observable, of } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationMockService extends AuthenticationService {
  constructor() {
    super({} as AuthService);
  }

  get isAuthenticated$(): Observable<boolean> {
    return of(false);
  }

  get user$(): Observable<unknown> {
    return of({
      'https://www.darkrushphotography.com/roles': [],
    } as Auth0User);
  }

  loginWithRedirect$(): Observable<void> {
    console.log('Login with Redirect from server');
    return EMPTY;
  }

  logout$(): Observable<void> {
    console.log('Logout from server');
    return EMPTY;
  }
}
