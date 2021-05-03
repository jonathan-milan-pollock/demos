import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  authenticationChanged = new Subject<boolean>();

  constructor(private router: Router) {}

  signIn(): void {
    this.isAuthenticated = true;
    this.authenticationChanged.next(this.isAuthenticated);
  }

  signOut(): void {
    this.isAuthenticated = false;
    this.authenticationChanged.next(this.isAuthenticated);
    this.router.navigate(['/admin']);
  }
}
