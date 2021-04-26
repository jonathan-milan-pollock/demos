import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { BottomNavBarComponent } from './bottom-nav-bar.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Bottom Nav Bar',
  component: BottomNavBarComponent,
  decorators: [
    moduleMetadata({
      imports: [WebsiteUiUiShellModule, BrowserModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<BottomNavBarComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-bottom-nav-bar></drp-bottom-nav-bar>',
};

export const Primary = Template.bind({});
Primary.args = {
  ...WithKnobs.args,
};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-bottom-nav-bar></drp-bottom-nav-bar>',
};
