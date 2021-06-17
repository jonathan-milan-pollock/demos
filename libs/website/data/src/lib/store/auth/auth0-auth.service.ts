import { Injectable } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class Auth0AuthService {
  constructor(private readonly authService: AuthService) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  get user$(): Observable<unknown> {
    return this.authService.user$;
  }

  loginWithRedirect$(): Observable<void> {
    return this.authService.loginWithRedirect();
  }

  logout$(): Observable<void> {
    this.authService.logout();
    return EMPTY;
  }
}
