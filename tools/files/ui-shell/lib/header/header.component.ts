import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Task } from '@dark-rush-photography/website/types';

@Component({
  selector: 'drp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  tasksInOrder: Task[] = [];

  @Input() loading = false;

  @Output() pinTask = new EventEmitter();
  @Output() archiveTask = new EventEmitter();
}
