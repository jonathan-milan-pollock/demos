import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { BottomNavBarButtonComponent } from './bottom-nav-bar-button.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Bottom Nav Bar Button',
  component: BottomNavBarButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiShellModule],
    }),
  ],
} as Meta;

const Template: Story<BottomNavBarButtonComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-bottom-nav-bar-button></drp-bottom-nav-bar-button>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-bottom-nav-bar-button></drp-bottom-nav-bar-button>',
};
