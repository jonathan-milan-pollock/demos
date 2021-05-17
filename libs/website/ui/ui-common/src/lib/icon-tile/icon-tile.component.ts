import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { faCameraAlt } from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'drp-icon-tile',
  templateUrl: './icon-tile.component.html',
  styleUrls: ['./icon-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTileComponent {
  @Input() name = '';
  @Input() width = 0;
  @Input() height = 0;
  @Input() faIcon = faCameraAlt;

  @Output() clicked = new EventEmitter<void>();

  onClicked(): void {
    console.log('clicked');
    this.clicked.emit();
  }
}
