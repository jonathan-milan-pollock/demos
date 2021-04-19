import { Meta } from '@storybook/angular/types-6-0';

import { NavBarButtonComponent } from './nav-bar-button.component';

export default {
  title: 'UI SHELL/Nav Bar Button',
  component: NavBarButtonComponent,
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
