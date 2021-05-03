import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  private authServiceSub?: Subscription;

  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authServiceSub = this.authService.authenticationChanged.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  onSignIn(): void {
    this.authService.signIn();
  }

  onSignOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authServiceSub?.unsubscribe();
  }
}
