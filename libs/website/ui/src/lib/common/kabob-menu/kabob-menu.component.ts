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

  @Output() darkModeSelected = new EventEmitter<void>();
  @Output() menuItemClicked = new EventEmitter<string>();

  onDarkModeSelected(): void {
    this.darkModeSelected.emit();
  }

  onMenuItemClicked(menuItem: string): void {
    this.menuItemClicked.emit(menuItem);
  }
}
