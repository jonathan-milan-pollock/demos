import { Component, Input } from '@angular/core';

export type ButtonStyle = 'default' | 'primary' | 'warning';
@Component({
  selector: 'drp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = 'Click me!';
  @Input() padding: number;
  @Input() style: ButtonStyle = 'default';
}
