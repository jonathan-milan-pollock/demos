import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { TitleBarKabobMenuComponent } from './title-bar-kabob-menu.component';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Title Bar Kabob Menu',
  component: TitleBarKabobMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiShellModule],
    }),
  ],
} as Meta;

const Template: Story<TitleBarKabobMenuComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-title-bar-kabob-menu></drp-title-bar-kabob-menu>',
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-title-bar-kabob-menu></drp-title-bar-kabob-menu>',
};
