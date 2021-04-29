import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { AuthService } from '@dark-rush-photography/website/util';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInChanged.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  onLogIn(): void {
    this.authService.logIn();
  }

  onLogOut(): void {
    this.authService.logOut();
  }
}
