import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Auth0User } from '@dark-rush-photography/website/types';
import { Auth0AuthService } from '@dark-rush-photography/website/util';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'drp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean> = EMPTY;
  private auth0UserSubscription?: Subscription;
  user?: Auth0User;

  constructor(private readonly auth0AuthService: Auth0AuthService) {}

  //TODO: Use authService.error$.subscribe((error) => console.log(error));
  ngOnInit(): void {
    this.isAuthenticated$ = this.auth0AuthService.isAuthenticated$;
    this.auth0UserSubscription = this.auth0AuthService.user$.subscribe(
      (user) => (this.user = user as Auth0User)
    );
  }

  get isAdmin(): boolean {
    const rolesUrl = 'https://www.darkrushphotography.com/roles';
    if (!this.user || !this.user[rolesUrl]) return false;

    return this.user[rolesUrl].includes('Admin');
  }

  onSignIn(): void {
    this.auth0AuthService.loginWithRedirect();
  }

  onSignOut(): void {
    this.auth0AuthService.logout();
  }

  ngOnDestroy(): void {
    this.auth0UserSubscription?.unsubscribe();
  }
}
