import { Meta } from '@storybook/angular/types-6-0';

import { TitleBarComponent } from './title-bar.component';

export default {
  title: 'UI SHELL/Title Bar',
  component: TitleBarComponent,
} as Meta;

interface StorybookComponent {
  moduleMetadata: { imports: [] };
  props: { [key: string]: unknown };
}

export const Primary = (): StorybookComponent => ({
  moduleMetadata: {
    imports: [],
  },
  props: {},
});
