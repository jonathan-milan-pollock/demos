import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { BottomContactBarComponent } from './bottom-contact-bar.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Bottom Contact Bar',
  component: BottomContactBarComponent,
  decorators: [
    moduleMetadata({
      imports: [WebsiteUiUiShellModule, BrowserModule, FontAwesomeModule],
    }),
  ],
} as Meta;

const Template: Story<BottomContactBarComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-bottom-contact-bar></drp-bottom-contact-bar>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-bottom-contact-bar></drp-bottom-contact-bar>',
};
