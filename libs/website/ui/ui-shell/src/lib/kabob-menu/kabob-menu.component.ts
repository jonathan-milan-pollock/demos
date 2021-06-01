import { Component, Output, EventEmitter, Input } from '@angular/core';

import {
  faEllipsisV,
  faCheckSquare,
  faSquare,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faFacebookSquare,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'drp-kabob-menu',
  templateUrl: './kabob-menu.component.html',
  styleUrls: ['./kabob-menu.component.scss'],
})
export class KabobMenuComponent {
  faEllipsisV = faEllipsisV;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faFacebookSquare = faFacebookSquare;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  @Input() isDarkModeSelected = true;
  @Input() isAuthenticated = false;

  @Output() darkModeSelected = new EventEmitter<void>();
  @Output() menuItemClicked = new EventEmitter<string>();
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  onDarkModeSelected(): void {
    this.darkModeSelected.emit();
  }

  onMenuItemClicked(menuItem: string): void {
    this.menuItemClicked.emit(menuItem);
  }

  onSignIn(): void {
    this.signIn.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}
