import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Auth0User } from '@dark-rush-photography/website/types';
import {
  faHome,
  faEdit,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'drp-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavBarComponent {
  faHome = faHome;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  @Input() isHomePage = true;
  @Input() isAuthenticated = false;
  @Input() user?: Auth0User | null;
  @Input() activeLink = '/';

  @Output() linkClicked = new EventEmitter<string>();
  @Output() signIn = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();

  onLinkClicked(link: string): void {
    this.linkClicked.emit(link);
  }

  onSignIn(): void {
    this.signIn.emit();
  }

  onSignOut(): void {
    this.signOut.emit();
  }
}
