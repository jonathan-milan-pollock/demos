import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ProgressiveImageComponent } from './progressive-image.component';
import { ElementsUiModule } from '../elements-ui.module';

export default {
  title: 'CUSTOM ELEMENTS/Progressive Image',
  component: ProgressiveImageComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ElementsUiModule],
    }),
  ],
} as Meta;

const Template: Story<ProgressiveImageComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-progressive-image></drp-progressive-image>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-progressive-image></drp-progressive-image>',
};
