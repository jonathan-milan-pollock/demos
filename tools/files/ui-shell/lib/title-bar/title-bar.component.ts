import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Task } from '@dark-rush-photography/website/types';

@Component({
  selector: 'drp-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  @Input() task?: Task;

  @Output() pinTask = new EventEmitter<Event>();
  @Output() archiveTask = new EventEmitter<Event>();

  pin(event: Event): void {
    console.log('pin');
    this.pinTask.emit(event);
  }

  archive(event: Event): void {
    console.log('archive');
    this.archiveTask.emit(event);
  }
}
