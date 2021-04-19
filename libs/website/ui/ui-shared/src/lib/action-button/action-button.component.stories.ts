import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ActionButtonComponent } from './action-button.component';
import { WebsiteUiUiSharedModule } from '../website-ui-ui-shared.module';

export default {
  title: 'UI Shared/Image Grid Gallery',
  component: ActionButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiSharedModule],
    }),
  ],
} as Meta;

const Template: Story<ActionButtonComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-action-button></drp-action-button>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-action-button></drp-action-button>',
};
