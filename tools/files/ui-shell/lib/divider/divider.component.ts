import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'drp-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  @Input() theme = 'Dark';
}
