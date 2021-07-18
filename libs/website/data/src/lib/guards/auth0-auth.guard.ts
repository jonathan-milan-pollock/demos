import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { map, Observable } from 'rxjs';

import { ADMIN } from '@dark-rush-photography/website/types'; // TODO: Move ADMIN constant to shared and remove from API
import { Auth0User } from '@dark-rush-photography/website/types';
//TODO: Fix this!!!
import { Auth0AuthService } from '../store/auth/auth0-auth.service';

@Injectable({
  providedIn: 'root',
})
export class Auth0AuthGuard implements CanActivate {
  constructor(private auth0AuthService: Auth0AuthService) {}

  isAdmin(user: Auth0User | undefined): boolean {
    const rolesUrl = 'https://www.darkrushphotography.com/roles';
    return user && user[rolesUrl] ? user[rolesUrl].includes(ADMIN) : false;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth0AuthService.user$.pipe(
      map((user) => this.isAdmin(user as Auth0User))
    );
  }
}
