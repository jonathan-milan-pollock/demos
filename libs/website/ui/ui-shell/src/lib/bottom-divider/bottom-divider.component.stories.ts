import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { select } from '@storybook/addon-knobs';

import { Theme } from '@dark-rush-photography/website/types';
import { BottomDividerComponent } from './bottom-divider.component';
import { CommonModule } from '@angular/common';
import { WebsiteUiUiShellModule } from '../website-ui-ui-shell.module';

export default {
  title: 'UI SHELL/Bottom Divider',
  component: BottomDividerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, WebsiteUiUiShellModule],
    }),
  ],
} as Meta;

const Template: Story<BottomDividerComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const WithKnobs = Template.bind({});
WithKnobs.args = {
  theme: select('theme', Object.keys(Theme), Theme.Dark) as Theme,
};
WithKnobs.parameters = {
  controls: { hideNoControlsWarning: true },
  template: '<drp-bottom-divider theme="Dark"></drp-bottom-divider>',
};

export const Primary = Template.bind({});
Primary.args = {
  theme: Theme.Dark,
};
Primary.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-bottom-divider theme="Dark"></drp-bottom-divider>',
};

export const Light = Template.bind({});
Light.args = {
  ...Primary.args,
  theme: Theme.Light,
};
Light.parameters = {
  ...WithKnobs.parameters,
  template: '<drp-bottom-divider theme="Light"></drp-bottom-divider>',
};
