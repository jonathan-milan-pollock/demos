import { Component, Input } from '@angular/core';

@Component({
  selector: 'drp-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss'],
})
export class HyperlinkComponent {
  @Input() url = '';
  @Input() text = '';
}
