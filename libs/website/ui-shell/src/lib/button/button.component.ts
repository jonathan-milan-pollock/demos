import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type ButtonStyle = 'default' | 'primary' | 'warning';

@Component({
  selector: 'drp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = 'Click me!';
  @Input() padding = 0;
  @Input() style: ButtonStyle = 'default';
}
