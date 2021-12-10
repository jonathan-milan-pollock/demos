import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faHome,
  faEdit,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'drp-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent {
  faHome = faHome;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  @Input() isHomePage = true;
  @Input() activeLink = '/';

  @Output() linkClicked = new EventEmitter<string>();

  onLinkClicked(link: string): void {
    this.linkClicked.emit(link);
  }
}
