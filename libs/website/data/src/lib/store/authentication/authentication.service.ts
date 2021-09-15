import { Injectable } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
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
