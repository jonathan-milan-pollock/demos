import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'drp-task',
  template: `
    <div class="list-item">
      <input type="text" [value]="task?.title" readonly="true" />
    </div>
  `,
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task?: { title: string } = undefined;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();
}
