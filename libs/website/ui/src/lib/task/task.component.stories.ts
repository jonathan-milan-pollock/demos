import { Story, Meta } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';

import { TaskComponent } from './task.component';
import { Task } from './task.model';

export default {
  title: 'Task',
  component: TaskComponent,
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onPinTask: action('pinTask'),
  onArchiveTask: action('archiveTask'),
};

const Template: Story<TaskComponent> = (args) => ({
  props: {
    ...args,
    onPinTask: actionsData.onPinTask,
    onArchiveTask: actionsData.onArchiveTask,
  },
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  } as Task,
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  } as Task,
};
