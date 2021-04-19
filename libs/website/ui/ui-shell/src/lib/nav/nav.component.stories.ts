import { Meta } from '@storybook/angular/types-6-0';

import { NavComponent } from './nav.component';

export default {
  title: 'UI SHELL/Nav',
  component: NavComponent,
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
