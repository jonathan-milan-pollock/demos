import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Theme } from '@dark-rush-photography/website/types';

@Component({
  selector: 'drp-bottom-divider',
  templateUrl: './bottom-divider.component.html',
  styleUrls: ['./bottom-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomDividerComponent {
  @Input() theme: Theme = Theme.Dark;
}
