import { Injectable } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable()
export class Auth0AuthService {
  constructor(private readonly authService: AuthService) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  get user$(): Observable<unknown> {
    return this.authService.user$;
  }

  logout(): void {
    this.authService.logout();
  }

  loginWithRedirect(): void {
    this.authService.loginWithRedirect();
  }
}
