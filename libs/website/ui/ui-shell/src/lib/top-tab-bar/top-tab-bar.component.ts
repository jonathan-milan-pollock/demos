import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { pluck } from 'rxjs/operators';
import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faCaravan } from '@fortawesome/pro-regular-svg-icons';
import { faSlidersVSquare } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'drp-top-tab-bar',
  templateUrl: './top-tab-bar.component.html',
  styleUrls: ['./top-tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTabBarComponent implements OnInit {
  faCameraAlt = faCameraAlt;
  faCalendar = faCalendar;
  faBookOpen = faBookOpen;
  faCaravan = faCaravan;
  faSlidersVSquare = faSlidersVSquare;

  activeUrl = '/';

  @Input() isAdmin = false;

  @Output() tabClick = new EventEmitter<string>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(pluck('url')).subscribe((url) => {
      if (url) {
        this.activeUrl = url as string;
      }
    });
  }
}
