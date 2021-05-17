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

  @Input() isDarkModeSelected = true;

  @Output() clicked = new EventEmitter<string>();

  onClicked(iconName: string): void {
    this.clicked.emit(iconName);
  }
}
