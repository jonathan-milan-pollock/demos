import { Component, ChangeDetectionStrategy } from '@angular/core';
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
}
