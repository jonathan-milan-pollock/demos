import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Task } from './task.model';

@Component({
  selector: 'drp-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task?: Task;

  @Output()
  pinTask = new EventEmitter<Event>();

  @Output()
  archiveTask = new EventEmitter<Event>();

  pin(event: Event): void {
    console.log('pin');
    this.pinTask.emit(event);
  }

  archive(event: Event): void {
    console.log('archive');
    this.archiveTask.emit(event);
  }
}
