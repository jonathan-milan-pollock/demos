import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { HeaderComponent } from './header.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Header',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiShellModule],
    }),
  ],
} as Meta;

const Template: Story<HeaderComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-header></drp-header>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-header></drp-header>',
};
