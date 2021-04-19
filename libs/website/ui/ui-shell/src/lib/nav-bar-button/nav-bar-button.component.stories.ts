import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { NavBarButtonComponent } from './nav-bar-button.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Nav Bar Button',
  component: NavBarButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiShellModule],
    }),
  ],
} as Meta;

const Template: Story<NavBarButtonComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-nav-bar-button></drp-nav-bar-button>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-nav-bar-button></drp-nav-bar-button>',
};
