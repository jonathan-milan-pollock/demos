import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faCaravan } from '@fortawesome/pro-regular-svg-icons';
import { faSlidersVSquare } from '@fortawesome/pro-light-svg-icons';

import { TopBarTab } from '@dark-rush-photography/website/types';

@Component({
  selector: 'drp-top-tab-bar',
  templateUrl: './top-tab-bar.component.html',
  styleUrls: ['./top-tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTabBarComponent implements OnInit {
  tabs: TopBarTab[] = [
    {
      name: 'Favorites',
      link: '/',
      faIcon: faCameraAlt,
      ariaLabel: 'Link to Favorites',
    },
    {
      name: 'Photo of the Week',
      link: '/photo-of-the-week',
      faIcon: faCalendar,
      ariaLabel: 'Link to Reviews',
    },
    {
      name: 'Events',
      link: '/events',
      faIcon: faBookOpen,
      ariaLabel: 'Link to Events',
    },
    {
      name: 'Destinations',
      link: '/destinations',
      faIcon: faCaravan,
      ariaLabel: 'Link to Destinations',
    },
    {
      name: 'Admin',
      link: '/admin',
      faIcon: faSlidersVSquare,
      ariaLabel: 'Link to Admin',
    },
  ];
  activeTab? = this.tabs[0];

  @Input() activeTabLink = '/';
  @Output() tabClick = new EventEmitter<string>();

  ngOnInit(): void {
    console.log();
    // this.activeTab = this.tabs.find((t) => t.link === this.activeTabLink);
  }

  onTabClick(link: string): void {
    this.activeTab = this.tabs.find((t) => t.link === link);
    this.tabClick.emit(link);
  }
}
