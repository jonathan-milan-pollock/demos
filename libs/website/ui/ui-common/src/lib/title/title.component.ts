import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'drp-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input() title = '';
}
