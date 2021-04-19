import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Task } from '@dark-rush-photography/website/types';

@Component({
  selector: 'drp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  task?: Task = undefined;
}
