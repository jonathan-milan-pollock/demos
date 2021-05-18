import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Auth0User } from '@dark-rush-photography/website/types';
import { Auth0AuthService } from './auth0-auth.service';

@Injectable({
  providedIn: 'root',
})
export class Auth0AuthGuard implements CanActivate {
  constructor(private auth0AuthService: Auth0AuthService) {}

  isAdmin(user: Auth0User | undefined): boolean {
    const rolesUrl = 'https://www.darkrushphotography.com/roles';
    return user && user[rolesUrl] ? user[rolesUrl].includes('Admin') : false;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth0AuthService.user$.pipe(
      map((user) => this.isAdmin(user as Auth0User))
    );
  }
}
