import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KabobMenuComponent {
  faKabobIconIcon = faEllipsisV;
  faFacebookSquare = faFacebookSquare;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  @Input() isDarkModeSelected = true;
  @Input() isAuthenticated = false;

  @Output() clicked = new EventEmitter<string>();
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  onClicked(iconName: string): void {
    this.clicked.emit(iconName);
  }

  onSignIn(): void {
    this.signIn.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}
