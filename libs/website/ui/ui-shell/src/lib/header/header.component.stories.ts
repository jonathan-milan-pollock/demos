import { Meta, Story } from '@storybook/angular/types-6-0';

import { HeaderComponent } from './header.component';
import { WebsiteUiUiDirectivesModule } from '@dark-rush-photography/website/ui/ui-directives';

export default {
  title: 'UI SHELL/Header',
  component: HeaderComponent,
} as Meta;

const Template: Story<HeaderComponent> = (args) => ({
  moduleMetadata: {
    imports: [WebsiteUiUiDirectivesModule],
  },
  props: {
    ...args,
    //onPinTask: actionsData.onPinTask,
    //onArchiveTask: actionsData.onArchiveTask,
  },
  //props: {...args, theme: }
});

export const Primary = Template.bind({});
Primary.args = {};
