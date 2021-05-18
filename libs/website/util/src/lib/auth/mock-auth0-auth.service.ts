import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0User } from '@dark-rush-photography/website/types';

import { Observable, of } from 'rxjs';

import { Auth0AuthService } from './auth0-auth.service';

@Injectable()
export class MockAuth0AuthService extends Auth0AuthService {
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

  logout(): void {
    console.log('Logout from server');
  }

  loginWithRedirect(): void {
    console.log('Login with Redirect from server');
  }
}
