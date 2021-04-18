import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';

import { HeaderComponent } from './header.component';

import * as TaskStories from '../task/task.component.stories';

export default {
  title: 'TaskList',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [HeaderComponent, TaskComponent],
    }),
  ],
};

const Template: Story<HeaderComponent> = (args) => ({
  props: {
    ...args,
    onPinTask: TaskStories.actionsData.onPinTask,
    onArchiveTask: TaskStories.actionsData.onArchiveTask,
  },
  template: `
    <div style="padding: 3rem">
      <drp-task-list 
        [tasks]="tasks" 
        [loading]=loading 
        (pinTask)="pinTask($event)"
        (archiveTask)="archiveTask($event)">
      </drp-task-list>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = !TaskStories.Default.args?.task?.state
  ? {}
  : {
      tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
      ],
    };

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args =
  !Default.args.tasks || !TaskStories.Default.args?.task
    ? {}
    : {
        tasks: [
          ...Default.args.tasks.slice(0, 5),
          {
            ...TaskStories.Default.args.task,
            id: '6',
            title: 'Task 6 (pinned)',
            state: 'TASK_PINNED',
          },
        ],
      };

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false,
};
