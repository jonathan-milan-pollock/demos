import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faCaravan } from '@fortawesome/pro-regular-svg-icons';
import { faSlidersVSquare } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'drp-top-tab-bar',
  templateUrl: './top-tab-bar.component.html',
  styleUrls: ['./top-tab-bar.component.scss'],
})
export class TopTabBarComponent {
  faCameraAlt = faCameraAlt;
  faCalendar = faCalendar;
  faBookOpen = faBookOpen;
  faCaravan = faCaravan;
  faSlidersVSquare = faSlidersVSquare;

  @Input() activeUrl = '/';
  @Input() isAdmin = false;

  @Output() tabClicked = new EventEmitter<string>();

  onTabClicked(activeUrl: string): void {
    this.tabClicked.emit(activeUrl);
  }
}
