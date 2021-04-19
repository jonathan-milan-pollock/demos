import { CommonModule } from '@angular/common';

import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { TiltShiftImageComponent } from './tilt-shift-image.component';
import { ElementsUiModule } from '../elements-ui.module';

export default {
  title: 'CUSTOM ELEMENTS/Tilt Shift Image',
  component: TiltShiftImageComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ElementsUiModule],
    }),
  ],
} as Meta;

const Template: Story<TiltShiftImageComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-tilt-shift-image></drp-tilt-shift-image>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-tilt-shift-image></drp-tilt-shift-image>',
};
