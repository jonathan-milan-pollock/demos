import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'drp-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HyperlinkComponent {
  @Input() url = '';
  @Input() text = '';
}
